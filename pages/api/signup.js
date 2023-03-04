import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
require('dotenv').config();
const nodemailer = require('nodemailer');
const mailjet = require("node-mailjet").apiConnect(
    process.env.NEXT_PUBLIC_MAILJET_API_KEY,
    process.env.NEXT_PUBLIC_MAILJET_SECRET_KEY
);

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if (!req.body.sendOtp) {
            const { name, email } = req.body
            try {
                let user = await User.findOne({ "email": req.body.email });
                if (!user) {
                    let u = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
                    await u.save()
                    res.status(200).json({ success: "success" })
                }
                else {
                    res.status(400).json({ error: "User Already Exists." })
                }
            }
            catch (err) {
                res.status(400).json({ error: err })
            }
        }
        else {
            let emailMessage = `
                <div>We have sent you this email in response to your request to send the otp on Le-Soft website.

        <br/> Otp for signup --> <a>${req.body.otp}</a>

        <br/><br/>

        We recommend that you do not share your otp with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your pasword.

        </div>`

            function sendEmail(recipient) {
                return mailjet
                    .post("send", { version: 'v3.1' })
                    .request({
                        Messages: [
                            {
                                From: {
                                    Email: "abhirupkumar2003@gmail.com",
                                    Name: "Le-Soft Team <no-reply@lesoft.in>",
                                },
                                To: [
                                    {
                                        Email: recipient,
                                    },
                                ],
                                Subject: "Le-Soft OTP",
                                TextPart: "Le-Soft",
                                HTMLPart: emailMessage,
                            },
                        ],
                    })
            }

            const mail = await sendEmail(req.body.email);
            if (mail.body.Messages[0].Status != "success") {
                res.status(400).json({ success: false, error: "Email not sent" })
                return
            }
            else {
                res.status(200).json({ success: true, message: "Email Sent" })
                return
            }
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler);
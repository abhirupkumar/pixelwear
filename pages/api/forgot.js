import User from '../../models/User'
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
require('dotenv').config();
const nodemailer = require('nodemailer');
const mailjet = require("node-mailjet").apiConnect(
    process.env.NEXT_PUBLIC_MAILJET_API_KEY,
    process.env.NEXT_PUBLIC_MAILJET_SECRET_KEY
);

export default async function handler(req, res) {

    if (req.method == 'POST') {

        if (req.body.sendMail) {
            //Check if the user exists in the database
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                //Generating random string for token
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                let result = '';
                let length = 12;
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                //Send an email to the user
                let token = jwt.sign({ email: req.body.email, name: result }, process.env.JWT_SECRET, { expiresIn: "700s" })

                let emailMessage = `
                <div>We have sent you this email in response to your request to reset your password on lesoft.in

        <br/>To reset your password, please follow the link below:

        <br/><a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}">Click here to reset your password</a> Link is valid for just 10 minutes.

        <br/><br/>

        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your pasword.

        </div>`

                async function sendEmail(recipient) {
                    const response = await mailjet
                        .post("send", { version: 'v3.1' })
                        .request({
                            Messages: [
                                {
                                    From: {
                                        Email: "abhirupkumar2003@gmail.com",
                                        Name: "Le-Soft Team • noreply@lesoft.in",
                                    },
                                    To: [
                                        {
                                            Email: recipient,
                                        },
                                    ],
                                    Subject: "Forgot Password",
                                    TextPart: "Le-Soft",
                                    HTMLPart: emailMessage,
                                },
                            ],
                        })
                      return response;
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
            else {
                res.status(400).json({ success: false, error: "User does not exist. Please sign up!" })
                return
            }
        }
        else {
            //Reset User Password
            let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
            let dbuser = await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })

            res.status(200).json({ success: true, message: "Password Reset Successful" })
            return
        }

    }
}

// export default connectDb(handler);

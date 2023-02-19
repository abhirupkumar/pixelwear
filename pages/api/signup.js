import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
require('dotenv').config();
const nodemailer = require('nodemailer');

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
                <div>We have sent you this email in response to your request to send the otp on Pixelwear website.

        <br/> Otp for signup --> <a>${req.body.otp}</a>

        <br/><br/>

        We recommend that you keep do not share your otp with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your pasword.

        </div>`


            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 495,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "abhirupkumar2003@gmail.com", //  user
                    pass: "vcinbyieriftnctz", //  password
                },
            });

            const mailOptions = {
                from: 'Le-Soft Team <no-reply@lesoft>', // Sender address
                to: req.body.email, // List of recipients
                subject: 'Pixelwear OTP', // Subject line
                html: emailMessage
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                    res.status(200).json({ success: false, message: "Error Occured." })
                }
                else {
                    res.status(200).json({ success: true, token, message: "OTP have been sent in your mail." })
                }
            });
            res.status(400).json({ success: true })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler);
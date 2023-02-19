import User from '../../models/User'
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
require('dotenv').config();
const nodemailer = require('nodemailer');

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
                <div>We have sent you this email in response to your request to reset your password on MissNeha.in

        <br/>To reset your password, please follow the link below:

        <br/><a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}">Click here to reset your password</a> Link is valid for just 10 minutes.

        <br/><br/>

        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your pasword.

        </div>`


                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: "abhirupkumar2003@gmail.com", //  user
                        pass: "vcinbyieriftnctz", //  password
                    },
                });

                const mailOptions = {
                    from: 'Le-Soft Team <no-reply@lesoft.in>', // Sender address
                    to: req.body.email, // List of recipients
                    subject: 'Password Reset Link', // Subject line
                    html: emailMessage
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                        res.status(200).json({ success: false, message: "Error Occured." })
                    }
                    else {
                        res.status(200).json({ success: true, token, message: "Password Reset Link have been sent in your mail." })
                    }
                });

            }
            else {
                res.status(400).json({ success: false, error: "User does not exist. Please sign up!" })
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
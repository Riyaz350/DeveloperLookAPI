const nodemailer = require("nodemailer");
const { AUTH_EMAIL, AUTH_PASS } = process.env
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "riyaz3582@gmail.com",
        pass: AUTH_PASS,
    },
});


const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
        return; 
    } catch (error) {
        throw error
    }
}

module.exports = sendEmail
const nodemailer = require("nodemailer");
const config = require("../../config/config")

const sendMail = async (emailObj) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.email_password
            },
            tls: { rejectUnauthorized: false }
        });
        const mailOptions = {
            from: config.email,
            to: emailObj.to,
            subject: emailObj.subject,
            html: emailObj.html,
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail

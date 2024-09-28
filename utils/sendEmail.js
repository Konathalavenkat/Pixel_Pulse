const nodemailer = require("nodemailer");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });
  const message = {
    to: emailTo,
    subject: subject,
    subject,
    html: `
        <div>
        <h3> Use this below code to ${content}</h3>
        <p><strong> Code: </strong>${code}</p>
        </div>
        `,
  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;
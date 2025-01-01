const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, referenceNo) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "User Registration Verification",
    text: `Your registration is successful. Reference Number: ${referenceNo}.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;

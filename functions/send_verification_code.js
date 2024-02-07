const nodemailer = require("nodemailer");

async function sendVerificationCode(email, code) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "s11925044@stu.najah.edu",
      pass: "BAn#36597",
    },
  });

  // create mailOptions
  const mailOptions = {
    from: "s11925044@stu.najah.edu",
    to: email,
    subject: "Let's Graduate Email Verification",
    text: `Your verification code is: : ${code}.`,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "email not found",
      body: req.body,
    });
  }
}

module.exports = sendVerificationCode;

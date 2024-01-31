const express = require("express");
const router = express.Router();
const randomstring = require("randomstring");
const User = require("../../models/user");
require("dotenv").config();
const nodemailer = require("nodemailer");

router.put("/email", async (req, res) => {
  try {
    const email = req.body.email;

    // check if email isn't in the table
    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      const verificationCode = randomstring.generate(4);
      console.log(verificationCode);
      await User.update(
        { verificationCode: verificationCode },
        {
          where: {
            email: email,
          },
          fields: ["verificationCode"],
        }
      );

      // Create secure transport
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // create mailOptions
      const mailOptions = {
        from: process.env.EMAIL_FROM, // Replace with actual sender address (e.g., "noreply@yourdomain.com")
        to: "omarmustafaqaneer@gmail.com",
        subject: "Email Verification",
        text: `Hello,
      
        Please verify your email address by entering the following code: ${verificationCode}
      
        This code is valid for 1 hour.
      
        Thank you for registering!
      
        Your app name`,
      };

      // send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          // Handle email sending errors gracefully (e.g., notify admin, retry later)
        } else {
          console.log("Email sent:", info.response);
          // Handle successful email sending (e.g., log in database, display confirmation message)
        }
      });

      res.json({ message: "verification code updated successfully" });
    } else {
      res.json({ message: "Invalid email please check it and try again" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching abstract data" });
  }
});

module.exports = router;

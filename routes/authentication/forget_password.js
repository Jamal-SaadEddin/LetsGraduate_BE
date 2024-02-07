const express = require("express");
const router = express.Router();
const randomstring = require("randomstring");
const User = require("../../models/user");
const sendVerificationCode = require("../../functions/send_verification_code");
require("dotenv").config();

router.put("/sendCode", async (req, res) => {
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

      await sendVerificationCode(email, verificationCode);

      res.json({ message: "verification code sended successfully" });
    } else {
      res.json({ message: "Invalid email please check it and try again" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

router.put("/verifyCode", async (req, res) => {
  try {
    const code = req.body.code;
    const email = req.body.email;

    // check if email isn't in the table
    const checkCode = await User.findOne({
      where: {
        email: email,
        verificationCode: code,
      },
    });

    if (checkCode) {
      await User.update(
        { isVerified: true },
        {
          where: {
            email: email,
          },
          fields: ["isVerified"],
        }
      );

      res.json({ message: "verification code verified successfully" });
    } else {
      res.json({ message: "Invalid code please try again later" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifing code" });
  }
});

module.exports = router;

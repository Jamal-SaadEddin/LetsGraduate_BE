const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/createUser", async (req, res) => {
  try {
    const newUser = {
      userId: req.body.userId,
      password: req.body.password,
      type: req.body.type,
    };

    // create new user based on data passed by POST body
    await User.create(newUser);

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.put("/updatePassword", async (req, res) => {
  try {
    const userId = req.body.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // Find the projectId associated with the studentId
    const user = await User.findOne({
      where: {
        userId: userId,
      },
    });

    // validate the old password
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing project title" });
  }
});

module.exports = router;

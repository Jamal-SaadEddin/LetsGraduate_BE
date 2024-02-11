const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Student = require("../../models/student");
const Doctor = require("../../models/doctor");

router.post("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const department = req.body.department;
    const address = req.body.address;
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;
    const type = req.body.type;

    // check if user exisit before
    const check = await User.findOne({
      where: {
        userId: userId,
      },
    });

    if (check) {
      res.json({
        message: "This user exisit before please try another userId",
      });
    } else {
      await User.create({
        userId: userId,
        type: type,
        email: email,
        password: password,
      });

      if (type == "student") {
        await Student.create({
          studentId: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          department: department,
          address: address,
          mobileNumber: mobileNumber,
        });
      } else if (type == "doctor") {
        await Doctor.create({
          doctorId: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          department: department,
          address: address,
          mobileNumber: mobileNumber,
        });
      }
      res.json({
        message: "New user created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating new user" });
  }
});

module.exports = router;

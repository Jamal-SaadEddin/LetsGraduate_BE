const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const User = require("../models/user");

router.delete("/account", async (req, res) => {
  try {
    const userId = req.body.userId;

    // Fetch user type
    const userType = await User.findOne({
      attributes: ["type"],
      where: {
        userId: userId,
      },
    });

    // delete user
    await User.destroy({
      where: {
        userId: userId,
      },
    });

    if (userType.type === "student") {
      //delete student data
      await Student.destroy({
        where: {
          studentId: userId,
        },
      });
    } else {
      //delete student data
      await Doctor.destroy({
        where: {
          doctorId: userId,
        },
      });
    }

    res.json({ message: "Account data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in deleting account data" });
  }
});

module.exports = router;

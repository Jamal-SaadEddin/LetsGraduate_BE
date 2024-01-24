const express = require("express");
const router = express.Router();
const Student = require("../../../models/student");

router.get("/studentsNotJoined", async (req, res) => {
  try {
    const { department, projectType } = req.query;

    // Retrieve students information who are without groups
    const students = await Student.findAll({
      attributes: [
        "studentId",
        "firstName",
        "lastName",
        "fullName",
        "email",
        "department",
        "address",
        "mobileNumber",
      ],
      where: {
        department: department,
        projectType: projectType,
        isWithGroup: 0,
      },
    });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students without groups" });
  }
});

module.exports = router;

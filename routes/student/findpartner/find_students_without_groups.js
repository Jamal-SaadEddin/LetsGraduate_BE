const express = require("express");
const router = express.Router();
const Student = require("../../../models/student");
const Sequelize = require("sequelize");

router.get("/studentsNotJoined", async (req, res) => {
  try {
    const { studentId } = req.query;

    // find department and project type
    const student = await Student.findOne({
      attributes: ["department", "projectType"],
      where: {
        studentId: studentId,
      },
    });

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
        department: student.department,
        projectType: student.projectType,
        isWithGroup: 0,
        studentId: { [Sequelize.Op.ne]: studentId },
      },
    });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students without groups" });
  }
});

module.exports = router;

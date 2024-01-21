const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Sequelize = require("sequelize");

router.post("/add", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json({
      message: "Student created successfully",
      studdent: newStudent,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { studentId } = req.query;

    const student = await Student.findOne({
      attributes: [
        "fullName",
        "email",
        "department",
        "address",
        "mobileNumber",
      ],
      where: {
        studentId: studentId,
      },
    });

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching student" });
  }
});

router.get("/find", async (req, res) => {
  try {
    const { studentsIds } = req.query;
    const ids = studentsIds.map((item) => item.id);

    const students = await Student.findAll({
      attributes: [
        "firstName",
        "lastName",
        "fullName",
        "email",
        "department",
        "address",
        "mobileNumber",
      ],
      where: {
        studentId: {
          [Sequelize.Op.in]: Sequelize.literal(`(${ids.join(",")})`),
        },
      },
    });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching student" });
  }
});

module.exports = router;

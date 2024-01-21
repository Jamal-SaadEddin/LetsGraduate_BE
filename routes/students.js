const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Sequelize = require("sequelize");
const Partnership = require("../models/partnership");
const Project = require("../models/project");

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

router.get("/projectTitle", async (req, res) => {
  try {
    const { studentId } = req.query;

    // Find the projectId associated with the studentId
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: studentId,
      },
    });

    const projectTitle = await Project.findOne({
      attributes: ["projectTitle"],
      where: {
        projectId: projectId.projectId,
      },
    });

    res.json(projectTitle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching project title" });
  }
});

router.get("/findMyPartners", async (req, res) => {
  try {
    const { studentId } = req.query;

    // Find the projectId associated with the studentId
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: studentId,
      },
    });

    if (projectId == null) {
      res.json("Doesn't have partnership");
      return; // Exit early if no partnership found
    }

    // Fetch student IDs based on the retrieved projectId
    const studentsIds = await Partnership.findAll({
      attributes: ["studentId"],
      where: {
        projectId: projectId.projectId, // Access projectId from result
      },
    });

    // Retrieve student information using the student IDs
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
          [Sequelize.Op.in]: Sequelize.literal(
            `(${studentsIds.map((item) => item.studentId).join(",")})`
          ),
        },
      },
    });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching partners" });
  }
});

module.exports = router;

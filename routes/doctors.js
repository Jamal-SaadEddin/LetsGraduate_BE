const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Project = require("../models/project");
const Sequelize = require("sequelize");
const Partnership = require("../models/partnership");

router.get("/findMySupervisorOrSupervisors", async (req, res) => {
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
      return;
    }

    // Fetch doctor IDs based on the retrieved projectId
    const doctorsIds = await Project.findAll({
      attributes: ["doctorId"],
      where: {
        projectId: projectId.projectId,
      },
    });

    // Retrieve doctor information using the doctor IDs
    const doctors = await Doctor.findAll({
      attributes: [
        "firstName",
        "lastName",
        "fullName",
        "email",
        "department",
        "mobileNumber",
      ],
      where: {
        doctorId: {
          [Sequelize.Op.in]: Sequelize.literal(
            `(${doctorsIds.map((item) => item.doctorId).join(",")})`
          ),
        },
      },
    });

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching partners" });
  }
});

module.exports = router;

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
    const doctor = await Project.findOne({
      attributes: ["doctorId", "mergedProjectId"],
      where: {
        projectId: projectId.projectId,
      },
    });

    // Retrieve doctor information using the doctor IDs
    const doctor1 = await Doctor.findOne({
      attributes: [
        "firstName",
        "lastName",
        "fullName",
        "email",
        "department",
        "mobileNumber",
      ],
      where: {
        doctorId: doctor.doctorId,
      },
    });

    if (doctor.mergedProjectId) {
      const doctorId2 = await Project.findOne({
        attributes: ["doctorId"],
        where: {
          mergedProjectId: doctor.mergedProjectId,
          projectId: { [Sequelize.Op.ne]: projectId.projectId },
        },
      });

      // Retrieve doctor information using the doctor IDs
      const doctor2 = await Doctor.findOne({
        attributes: [
          "firstName",
          "lastName",
          "fullName",
          "email",
          "department",
          "mobileNumber",
        ],
        where: {
          doctorId: doctorId2.doctorId,
        },
      });
      const allDoctors = { doctor1, doctor2 };
      res.json(Object.values(allDoctors));
    } else {
      res.json(doctor1);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching partners" });
  }
});

router.get("/viewDoctorInfo", async (req, res) => {
  try {
    const { doctorId } = req.query;

    // Find the projectId associated with the studentId
    const doctor = await Doctor.findOne({
      attributes: [
        "doctorId",
        "firstName",
        "lastName",
        "fullName",
        "department",
        "address",
        "email",
        "mobileNumber",
      ],
      where: {
        doctorId: doctorId,
      },
    });

    res.json({
      id: doctor.doctorId,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      fullName: doctor.fullName,
      department: doctor.department,
      address: doctor.address,
      email: doctor.email,
      mobileNumber: doctor.mobileNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching doctor data" });
  }
});

router.put("/updateProfile", async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const studentUpdateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
    };

    await Student.update(studentUpdateData, {
      where: {
        studentId: studentId,
      },
      fields: ["firstName", "lastName", "address", "mobileNumber"],
    });

    res.json({ message: "Student data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student data" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Submission = require("../../models/submission");
const Student = require("../../models/student");
const Doctor = require("../../models/doctor");
const Department = require("../../models/department");

router.get("/settings", async (req, res) => {
  try {
    const { doctorId } = req.query;

    // Find the department name associated with the doctorId
    const departmentName = await Doctor.findOne({
      attributes: ["department"],
      where: {
        doctorId: doctorId,
      },
    });

    // Find department settings associated with department name
    const departmentSettings = await Department.findOne({
      where: {
        departmentName: departmentName.department,
      },
    });

    // Find number of registerd students
    const registeredCount = await Student.count({
      where: {
        isWithGroup: true,
      },
    });

    //Find number of supervisors
    const supervisorsCount = await Doctor.count({
      where: {
        isSupervisor: true,
      },
    });

    // Find number of project committee
    const projectCommitteeCount = await Doctor.count({
      where: {
        isProjectsCommitteeMember: true,
      },
    });

    // Find names and ids of projects committee
    let committeeNamesAndIds = await Doctor.findAll({
      attributes: ["firstName", "lastName", "fullName", "doctorId"],
      where: {
        isProjectsCommitteeMember: true,
      },
    });

    let arrayOfNamesAndIds1 = [];
    for (const index in committeeNamesAndIds) {
      let fullName = committeeNamesAndIds[index].fullName;
      let doctorId = committeeNamesAndIds[index].doctorId;
      arrayOfNamesAndIds1[index] = fullName + " - " + doctorId;
    }

    // Find names and ids of supervisors
    const supervisorsNamesAndIds = await Doctor.findAll({
      attributes: ["firstName", "lastName", "fullName", "doctorId"],
      where: {
        isSupervisor: true,
      },
    });

    let arrayOfNamesAndIds2 = [];
    for (const index in supervisorsNamesAndIds) {
      let fullName = supervisorsNamesAndIds[index].fullName;
      let doctorId = supervisorsNamesAndIds[index].doctorId;
      arrayOfNamesAndIds2[index] = fullName + " - " + doctorId;
    }

    // Find names and ids for all doctors
    let allDoctors = await Doctor.findAll({
      attributes: ["firstName", "lastName", "fullName", "doctorId"],
    });

    let arrayOfNamesAndIds3 = [];
    for (const index in allDoctors) {
      let fullName = allDoctors[index].fullName;
      let doctorId = allDoctors[index].doctorId;
      arrayOfNamesAndIds3[index] = fullName + " - " + doctorId;
    }

    const departmentSettingsData = {
      ...departmentSettings.dataValues,
      noOfRegisteredStudents: registeredCount,
      noOfSupervisors: supervisorsCount,
      noOfProjectsCommitteeMembers: projectCommitteeCount,
      supervisingDoctors: arrayOfNamesAndIds2,
      projectsCommitteeMembers: arrayOfNamesAndIds1,
      allDoctors: arrayOfNamesAndIds3,
    };

    res.json(departmentSettingsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching submissions" });
  }
});

module.exports = router;

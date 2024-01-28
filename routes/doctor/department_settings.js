const express = require("express");
const router = express.Router();
const Student = require("../../models/student");
const Doctor = require("../../models/doctor");
const Department = require("../../models/department");
const Sequelize = require("sequelize");

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
        department: departmentName.department,
      },
    });

    //Find number of supervisors
    const supervisorsCount = await Doctor.count({
      where: {
        isSupervisor: true,
        department: departmentName.department,
      },
    });

    // Find number of project committee
    const projectCommitteeCount = await Doctor.count({
      where: {
        isProjectsCommitteeMember: true,
        department: departmentName.department,
      },
    });

    // Find names and ids of projects committee
    let committeeNamesAndIds = await Doctor.findAll({
      attributes: ["firstName", "lastName", "fullName", "doctorId"],
      where: {
        isProjectsCommitteeMember: true,
        department: departmentName.department,
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
        department: departmentName.department,
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
      where: {
        department: departmentName.department,
      },
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

router.put("/editSettings", async (req, res) => {
  try {
    const departmentName = req.body.departmentName;
    const maxNoOfStuPerProj = req.body.maxNoOfStuPerProj;
    const maxNoOfProjPerDoct = req.body.maxNoOfProjPerDoct;
    const maxNoOfStuPerDoct = req.body.maxNoOfStuPerDoct;
    const currentPeriod = req.body.currentPeriod;
    const supervisingDoctors = req.body.supervisingDoctors;
    const projectsCommitteeMembers = req.body.projectsCommitteeMembers;

    // update department setting based on department name
    await Department.update(
      {
        maxNoOfStuPerProj: maxNoOfStuPerProj,
        maxNoOfProjPerDoct: maxNoOfProjPerDoct,
        maxNoOfStuPerDoct: maxNoOfStuPerDoct,
        currentPeriod: currentPeriod,
      },
      {
        where: {
          departmentName: departmentName,
        },
        fields: [
          "maxNoOfStuPerProj",
          "maxNoOfProjPerDoct",
          "maxNoOfStuPerDoct",
          "currentPeriod",
        ],
      }
    );

    // get ids of supervisors
    const supervisorsIds = [];
    for (const supervisor in supervisingDoctors) {
      const supervisorData = supervisingDoctors[supervisor];
      const data = supervisorData.split(" - ");
      const id = parseInt(data[1]);
      supervisorsIds[supervisor] = id;
    }

    // get ids of supervisors
    const projectCommitteIds = [];
    for (const projectCommitte in projectsCommitteeMembers) {
      const projectCommitteData = projectsCommitteeMembers[projectCommitte];
      const data = projectCommitteData.split(" - ");
      const id = parseInt(data[1]);
      projectCommitteIds[projectCommitte] = id;
    }

    console.log(supervisorsIds);
    console.log(projectCommitteIds);

    // set supervisors
    await Doctor.update(
      {
        isSupervisor: true,
      },
      {
        where: {
          doctorId: { [Sequelize.Op.in]: supervisorsIds },
          department: departmentName,
        },
        fields: ["isSupervisor"],
      }
    );

    // set other doctors not supervisors
    await Doctor.update(
      {
        isSupervisor: false,
      },
      {
        where: {
          doctorId: { [Sequelize.Op.notIn]: supervisorsIds },
          department: departmentName,
        },
        fields: ["isSupervisor"],
      }
    );

    // update projects Committe
    await Doctor.update(
      {
        isProjectsCommitteeMember: true,
      },
      {
        where: {
          doctorId: {
            [Sequelize.Op.in]: projectCommitteIds,
          },
          department: departmentName,
        },
        fields: ["isProjectsCommitteeMember"],
      }
    );

    // set other doctors not projects Committe
    await Doctor.update(
      {
        isProjectsCommitteeMember: false,
      },
      {
        where: {
          doctorId: {
            [Sequelize.Op.notIn]: projectCommitteIds,
          },
          department: departmentName,
        },
        fields: ["isProjectsCommitteeMember"],
      }
    );

    res.json({ message: "Department settings updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating department settings" });
  }
});

module.exports = router;

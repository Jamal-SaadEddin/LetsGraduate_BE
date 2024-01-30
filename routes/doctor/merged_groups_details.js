const express = require("express");
const router = express.Router();
const Student = require("../../models/student");
const Sequelize = require("sequelize");
const Partnership = require("../../models/partnership");
const Project = require("../../models/project");

router.get("/groups", async (req, res) => {
  try {
    const { requestingGroupId } = req.query;
    const { requestedGroupId } = req.query;

    const mergedGroupdIds = [requestingGroupId, requestedGroupId];

    const mergedGroupsData = {};
    const keys = ["requestingGroup", "requestedGroup"];
    for (const index in mergedGroupdIds) {
      const mergedGroupId = mergedGroupdIds[index];
      // Find the projectId, projectTitle, and doctorId associated with the projectId
      const project = await Project.findOne({
        attributes: ["projectId", "projectTitle", "doctorId"],
        where: {
          projectId: mergedGroupId,
        },
      });

      mergedGroupsData[index] = {
        id: project.dataValues.projectId,
        title: project.dataValues.projectTitle,
        doctorId: project.dataValues.doctorId,
      };
    }

    const mergedData = {};
    for (const index in Object.values(mergedGroupsData)) {
      const mergedGroupData = Object.values(mergedGroupsData)[index];
      const projectId = mergedGroupData.id;

      // get students IDs for every project based on projectId
      const studentsIds = await Partnership.findAll({
        attributes: ["studentId"],
        where: {
          projectId: projectId,
        },
      });

      // Retrieve student information using the student IDs
      const students = await Student.findAll({
        attributes: [
          "studentId",
          "firstName",
          "lastName",
          "fullName",
          "email",
          "department",
          "address",
          "projectType",
        ],
        where: {
          studentId: {
            [Sequelize.Op.in]: Sequelize.literal(
              `(${studentsIds.map((item) => item.studentId).join(",")})`
            ),
          },
        },
      });

      let gpState;
      const studentsData = {};
      // get projectType current project for student
      for (const student in students) {
        const studentData = students[student].dataValues;
        const studentId = studentData.studentId;

        // get status of current project based on studentId
        if (studentData.projectType == "gp1") {
          gpState = await Student.findOne({
            attributes: ["gp1State"],
            where: {
              studentId: studentId,
            },
          });
          studentsData[student] = {
            ...studentData,
            projectStatus: gpState.gp1State,
            fullName: students[student].fullName,
          };
        } else {
          gpState = await Student.findOne({
            attributes: ["gp2State"],
            where: {
              studentId: studentId,
            },
          });
          studentsData[student] = {
            ...studentData,
            projectStatus: gpState.gp2State,
            fullName: students[student].fullName,
          };
        }

        // add field students to projects and give it students as value
        mergedGroupData["students"] = Object.values(studentsData);
        mergedData[keys[index]] = mergedGroupData;
      }
    }

    res.json(mergedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching my groups" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Student = require("../../models/student");
const Sequelize = require("sequelize");
const Partnership = require("../../models/partnership");
const Project = require("../../models/project");

router.get("/groups", async (req, res) => {
  try {
    const { doctorId } = req.query;

    // Find the projectId associated with the studentId
    const projects = await Project.findAll({
      attributes: ["projectId", "projectTitle"],
      where: {
        doctorId: doctorId,
      },
    });

    // rename columns projectId to id and projectTitle to title
    const formattedProjects = projects.map((project) => ({
      id: project.projectId,
      title: project.projectTitle,
    }));

    const projectsData = {};
    for (const project in formattedProjects) {
      // fetch group data and get projectId
      const projectData = formattedProjects[project];
      const projectId = projectData.id;

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
      }
      console.log(Object.values(studentsData));

      // add field students to projects and give it students as value
      projectData["students"] = Object.values(studentsData);
      projectsData[project] = projectData;
    }

    res.json(Object.values(projectsData));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching my groups" });
  }
});

module.exports = router;

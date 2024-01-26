const express = require("express");
const router = express.Router();
const Student = require("../../models/student");
const Sequelize = require("sequelize");
const Partnership = require("../../models/partnership");
const Project = require("../../models/project");
const Submission = require("../../models/submission");

router.get("/submissions", async (req, res) => {
  try {
    const { doctorId } = req.query;

    // Find submissions for evaluating based on doctorId

    const submissions = await Submission.findAll({
      attributes: ["projectId"],
      where: {
        evaluatorId: doctorId,
      },
    });

    const submissionsData = {};
    for (const submission in submissions) {
      const submissionData = submissions[submission].dataValues;

      // Find the projectId and projectTitle associated with the projectId
      const project = await Project.findOne({
        attributes: ["projectId", "projectTitle"],
        where: {
          projectId: submissionData.projectId,
        },
      });

      submissionsData[submission] = project.dataValues;
    }

    // rename columns projectId to id and projectTitle to title
    const formattedProjects = Object.values(submissionsData).map((project) => ({
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
        ],
        where: {
          studentId: {
            [Sequelize.Op.in]: Sequelize.literal(
              `(${studentsIds.map((item) => item.studentId).join(",")})`
            ),
          },
        },
      });

      // add field students to projects and give it students as value
      projectData["students"] = students.map((student) => ({
        ...student.dataValues,
        fullName: student.fullName,
      }));
      projectsData[project] = projectData;
    }

    res.json(Object.values(projectsData));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching my groups" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Sequelize = require("sequelize");
const Partnership = require("../models/partnership");
const Project = require("../models/project");

router.get("/findGroups", async (req, res) => {
  try {
    const { department, projectType } = req.query;

    // Find the projectsIds associated with the department and projectType
    const projectsIds = await Project.findAll({
      attributes: ["projectId"],
      where: {
        department: department,
        projectType: projectType,
      },
    });

    const groupsIds = {};
    const projectsIdsList = projectsIds.map((project) => project.projectId);

    // Fetch groups IDs based on the retrieved projectsIds
    for (const projectId of projectsIdsList) {
      const studentsIds = await Partnership.findAll({
        attributes: ["studentId"],
        where: {
          projectId: projectId,
        },
      });
      groupsIds[projectId] = studentsIds.map((student) => student.studentId);
    }
    const groupsData = {};

    for (const groupIdsKey in groupsIds) {
      // Retrieve group information using the group IDs

      const groupIdsValues = groupsIds[groupIdsKey];
      const groupData = await Student.findAll({
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
          studentId: {
            [Sequelize.Op.in]: groupIdsValues,
          },
        },
      });
      groupsData[groupIdsKey] = groupData.map((group) => ({
        ...group.dataValues,
        fullName: group.fullName,
      }));
    }

    res.json(Object.values(groupsData));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching groups data" });
  }
});

module.exports = router;

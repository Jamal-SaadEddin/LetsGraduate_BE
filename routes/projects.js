const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Partnership = require("../models/partnership");

router.get("/fetchProject/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the projectId associated with the studentId
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: studentId,
      },
    });

    const project = await Project.findOne({
      attributes: ["projectTitle", "projectType"],
      where: {
        projectId: projectId.projectId,
      },
    });

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching project title" });
  }
});

router.put("/editTitle/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { projectTitle } = req.body;
    console.log(studentId);
    console.log(projectTitle);

    // Find the projectId associated with the studentId
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: studentId,
      },
    });

    await Project.update(
      { projectTitle: projectTitle },
      { where: { projectId: projectId.projectId } }
    );

    res.json({ message: "Project title updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing project title" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Partnership = require("../models/partnership");
const Student = require("../models/student");

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

router.put("/projectStatus/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const projectType = req.body.projectType;
    const gpState = req.body.gpState;

    if (gpState == "in progress") {
      await Student.update(
        { gp1State: "in progress", projectType: projectType },
        { where: { studentId: studentId } }
      );
    } else if (projectType == "GP1") {
      await Student.update(
        { gp1State: gpState, projectType: null },
        { where: { studentId: studentId } }
      );
    } else if (projectType == "GP2") {
      await Student.update(
        { gp2State: gpState, projectType: null },
        { where: { studentId: studentId } }
      );
    } else {
      return res.json({
        message:
          "Invalid  project type or project State value  please check them again!",
      });
    }

    res.json({ message: "Project status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing project status" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Submission = require("../../models/submission");
const Project = require("../../models/project");

router.get("/submissions", async (req, res) => {
  try {
    const { doctorId } = req.query;

    // Find the projectsIds associated with the doctorId
    const projects = await Project.findAll({
      attributes: ["projectId"],
      where: {
        doctorId: doctorId,
      },
    });

    const projectsIds = projects.map((project) => project.dataValues);

    const submissions = {};
    for (const projectId in projectsIds) {
      const projectIdValue = projectsIds[projectId].projectId;

      // Find the submission associated with the projectId
      const submission = await Submission.findAll({
        where: {
          projectId: projectIdValue,
        },
      });

      if (Object.keys(submission).length) {
        submissions[projectId] = submission.map((item) => item.dataValues);
      }
    }

    res.json(Object.values(submissions));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching submissions" });
  }
});

module.exports = router;

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

    // Find the submissions associated with the doctorId for evaluating
    const submissionsEvaluating = await Submission.findAll({
      where: {
        evaluatorId: doctorId,
      },
    });

    const projectsIds = projects.map((project) => project.dataValues);

    const submissions = {};
    let index = 0;
    for (const projectId in projectsIds) {
      const projectIdValue = projectsIds[projectId].projectId;
      index = projectId;

      // Find the submission associated with the projectId
      const submission = await Submission.findAll({
        where: {
          projectId: projectIdValue,
        },
      });

      if (Object.keys(submission).length) {
        submissions[projectId] = submission.map((item) => ({
          ...item.dataValues,
          operation: "viewing",
        }));
      }
    }

    if (submissionsEvaluating) {
      for (const submission in submissionsEvaluating) {
        const submissionData = submissionsEvaluating[submission].dataValues;
        index++;
        submissions[index] = { ...submissionData, operation: "evaluating" };
      }
    }

    res.json(Object.values(submissions));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching submissions" });
  }
});

router.put("/editStatus", async (req, res) => {
  try {
    const { projectId } = req.query;

    await Submission.update(
      { acceptStatus: "Accepted" },
      {
        where: {
          projectId: projectId,
        },
        fields: ["acceptStatus"],
      }
    );

    res.json({ message: "Abstract accept status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating abstract accept status" });
  }
});

module.exports = router;

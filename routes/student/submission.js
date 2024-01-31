const express = require("express");
const router = express.Router();
const Submission = require("../../models/submission");

router.post("/submissionAdd", async (req, res) => {
  try {
    const newSubmission = {
      projectId: req.body.projectId,
      type: "abstract",
      file: req.body.file,
      acceptStatus: "Pending",
    };

    // check if group is submitted before
    const checkSubmission = await Submission.findOne({
      where: {
        projectId: newSubmission.projectId,
      },
    });

    if (checkSubmission) {
      await Submission.update(
        { file: newSubmission.file },
        {
          where: {
            projectId: newSubmission.projectId,
          },
          fields: ["file"],
        }
      );

      const editedSubmission = await Submission.findOne({
        where: {
          projectId: newSubmission.projectId,
        },
      });
      res.json(editedSubmission);
    } else {
      // create new submission based on data passed by POST body
      const newSubmission2 = await Submission.create(newSubmission);

      const submission = await Submission.findOne({
        where: {
          projectId: newSubmission.projectId,
        },
      });
      res.json(submission);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding submission" });
  }
});

router.delete("/submissionDelete", async (req, res) => {
  try {
    const { submissionId } = req.query;

    // Check if there's submission to delete
    const submission = await Submission.findOne({
      where: {
        submissionId: submissionId,
      },
    });

    if (submission) {
      // delete submission
      await Submission.destroy({
        where: {
          submissionId: submissionId,
        },
      });
      res.json({ message: "Account data deleted successfully" });
    } else {
      res.json({ message: "This group doesn't have submission to delete" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in deleting submission data" });
  }
});

module.exports = router;

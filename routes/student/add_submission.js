const express = require("express");
const router = express.Router();
const Submission = require("../../models/submission");

router.post("/submission", async (req, res) => {
  try {
    const newSubmission = {
      projectId: req.body.projectId,
      type: "abstract",
      file: req.body.file,
      acceptStatus: "Pending",
    };

    // create new user based on data passed by POST body
    const newSubmission2 = await Submission.create(newSubmission);

    const submission = await Submission.findOne({
      where: {
        projectId: newSubmission.projectId,
      },
    });

    res.json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding submission" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Partnership = require("../../models/partnership");
const Submission = require("../../models/submission");

router.get("/abstract", async (req, res) => {
  try {
    const { studentId } = req.query;

    // Find the projectId associated with the studentId
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: studentId,
      },
    });
    // Find the abstract associated with the projectId
    const submission = await Submission.findOne({
      where: {
        projectId: projectId.projectId,
      },
    });

    if (submission) {
      res.json(submission);
    } else {
      res.json(undefined);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching abstract data" });
  }
});

module.exports = router;

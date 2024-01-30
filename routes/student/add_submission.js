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

router.delete("/submission", async (req, res) => {
  try {
    const { userId } = req.query;

    // Fetch user type
    const userType = await User.findOne({
      attributes: ["type"],
      where: {
        userId: userId,
      },
    });

    // delete user
    await Submission.destroy({
      where: {
        userId: userId,
      },
    });

    if (userType.type === "student") {
      //delete student data
      await Student.destroy({
        where: {
          studentId: userId,
        },
      });
    } else {
      //delete student data
      await Doctor.destroy({
        where: {
          doctorId: userId,
        },
      });
    }

    res.json({ message: "Account data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in deleting account data" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Partnership = require("../../models/partnership");
const Comment = require("../../models/comment");
const Project = require("../../models/project");

router.get("/comments", async (req, res) => {
  try {
    const { studentId } = req.query;

    // Find the projectId associated with the studentId
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: studentId,
      },
    });

    // Find supervisorId associated with the studentId
    const supervisorsIds = await Project.findAll({
      attributes: ["doctorId"],
      where: {
        projectId: projectId.projectId,
      },
    });

    // Find the comments associated with the projectId
    const comments = await Comment.findAll({
      where: {
        projectId: projectId.projectId,
      },
    });

    const commentsData = {};
    for (const comment in comments) {
      const commentData = comments[comment];
      for (const supervisorId in supervisorsIds) {
        const supervisorIdValue =
          supervisorsIds[supervisorId].dataValues.doctorId;

        if (commentData.dataValues.doctorId == supervisorIdValue) {
          commentsData[comment] = commentData.dataValues;
        } else {
          commentsData[comment] = commentData.dataValues;
        }
      }
    }

    res.json(Object.values(commentsData));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comment data" });
  }
});

module.exports = router;

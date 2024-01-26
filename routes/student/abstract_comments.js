const express = require("express");
const router = express.Router();
const Partnership = require("../../models/partnership");
const Comment = require("../../models/comment");
const Project = require("../../models/project");
const Doctor = require("../../models/doctor");

router.get("/comments", async (req, res) => {
  try {
    const { id } = req.query;

    // check if id for student or project ?? if it's for studend we will find projectId ,
    let projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: id,
      },
    });

    if (!projectId) {
      projectId = id;
    } else {
      projectId = projectId.projectId;
    }

    console.log(id);
    console.log(projectId);

    // Find supervisorId associated with the studentId
    const supervisorsIds = await Project.findAll({
      attributes: ["doctorId"],
      where: {
        projectId: projectId,
      },
    });

    // Find the comments associated with the projectId
    const comments = await Comment.findAll({
      where: {
        projectId: projectId,
      },
    });

    const commentsData = {};
    for (const comment in comments) {
      const commentData = comments[comment];
      for (const supervisorId in supervisorsIds) {
        const supervisorIdValue =
          supervisorsIds[supervisorId].dataValues.doctorId;
        if (commentData.dataValues.doctorId == supervisorIdValue) {
          // Find the Name associated with the doctorId
          const sender = await Doctor.findOne({
            attributes: ["firstName", "lastName", "fullName"],
            where: {
              doctorId: supervisorIdValue,
            },
          });
          commentsData[comment] = {
            ...commentData.dataValues,
            sender: "DR. " + sender.fullName,
          };
        } else {
          commentsData[comment] = {
            ...commentData.dataValues,
            sender: "Projects Committee",
          };
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

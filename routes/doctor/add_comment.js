const express = require("express");
const router = express.Router();
const createNotification = require("../../functions/create_notification");
const Partnership = require("../../models/partnership");
const Comment = require("../../models/comment");

router.post("/notification", async (req, res) => {
  try {
    const doctorId = req.body.doctorId;
    const projectId = req.body.projectId;
    const commentContent = req.body.content;

    // data for notification
    const senderId = doctorId;
    const type = "comment";
    const content = "commented on your abstract";
    const senderType = "doctor";

    // Send join request when receiver student is in group
    await Comment.create({
      doctorId: doctorId,
      projectId: projectId,
      content: commentContent,
      dateCreated: new Date().toISOString(),
    });

    // Find groupIds associated with the projectId
    const groupIds = await Partnership.findAll({
      attributes: ["studentId"],
      where: {
        projectId: projectId,
      },
    });

    let requestCreated;
    for (const studentId in groupIds) {
      const studentIdValue = groupIds[studentId].dataValues.studentId;
      const reciverId = studentIdValue;
      requestCreated = await createNotification({
        reciverId,
        senderId,
        type,
        content,
        senderType,
      });
    }
    if (requestCreated) {
      res.json({ message: "Notification created successfully" });
    } else {
      res.json({ message: "You or your group sent a request before" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in creating notification" });
  }
});

module.exports = router;

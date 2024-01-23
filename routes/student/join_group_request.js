const express = require("express");
const router = express.Router();
const Partnership = require("../../models/partnership");
const Notification = require("../../models/notification");
const Student = require("../../models/student");

router.post("/notification", async (req, res) => {
  try {
    const reciverId = req.body.reciverId;
    const senderId = req.body.senderId;
    const type = req.body.type;
    const content = req.body.content;
    const commentDate = new Date();
    const formattedDate = commentDate.toISOString();

    // Check if sender is within group
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: reciverId,
      },
    });
    if (projectId) {
      // Find the studentsIds associated with the projectId
      const studentsIds = await Partnership.findAll({
        attributes: ["studentId"],
        where: {
          projectId: projectId.projectId,
        },
      });
      for (const studentId in studentsIds) {
        const studentIdValue = studentsIds[studentId].dataValues.studentId;

        // send join request when reciver student is in group
        await Notification.create({
          senderId: senderId,
          reciverId: studentIdValue,
          readStatus: "unread",
          type: type,
          acceptStatus: "pending",
          content: content,
          dateCreated: formattedDate,
          senderType: "student",
        });
      }
    } else {
      // send join request when reciver student is single(without group)
      await Notification.create({
        senderId: senderId,
        reciverId: reciverId,
        readStatus: "unread",
        type: type,
        acceptStatus: "pending",
        content: content,
        dateCreated: formattedDate,
        senderType: "student",
      });
    }

    res.json({
      message: "Notification created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in creating notification" });
  }
});

module.exports = router;

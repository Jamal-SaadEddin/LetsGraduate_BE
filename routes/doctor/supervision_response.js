const express = require("express");
const router = express.Router();
const Notification = require("../../models/notification");
const Partnership = require("../../models/partnership");
const createNotification = require("../../functions/create_notification");
const Sequelize = require("sequelize");

router.put("/response", async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const reciverId = req.body.reciverId;
    const type = req.body.type;
    const acceptStatus = req.body.acceptStatus;
    const notificationId = req.body.notificationId;
    const senderType = "doctor";

    // get students IDs for every project based on projectId
    const studentsIds = await Partnership.findAll({
      attributes: ["studentId"],
      where: {
        projectId: reciverId,
      },
    });

    // update status of request notification from pending to accepted or declined
    await Notification.update(
      {
        acceptStatus: acceptStatus,
      },
      {
        where: {
          notificationId: notificationId,
        },
        fields: ["acceptStatus"],
      }
    );

    let content;
    if (acceptStatus == "accepted") {
      content = "accepted to supervise your group this semester";

      // delete other requests that sent to other doctors
      await Notification.destroy({
        where: {
          reciverId: reciverId,
          type: "request",
          senderType: "group",
          reciverId: {
            [Sequelize.Op.ne]: senderId,
          },
        },
      });
    } else {
      content =
        "Unfortunately, I'm unable to supervise your graduation project currently. Your understanding is appreciated. Thank you.";
    }

    let requestCreated;
    // Send response for every student in the group
    for (const studentId in studentsIds) {
      const reciverId = studentsIds[studentId].dataValues.studentId;

      // Send response to group
      requestCreated = await createNotification({
        reciverId,
        senderId,
        type,
        content,
        senderType,
      });
    }

    if (requestCreated) {
      res.json({ message: "Supervision request processed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing supervision request" });
  }
});

module.exports = router;

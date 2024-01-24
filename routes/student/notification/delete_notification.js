const express = require("express");
const router = express.Router();
const Partnership = require("../../../models/partnership");
const Notification = require("../../../models/notification");

router.delete("/notification", async (req, res) => {
  try {
    const { senderId } = req.query;
    const { receiverId } = req.query;
    const { joinType } = req.query;

    if (joinType == "group") {
      // Check if receiver is within group
      projectId = await Partnership.findOne({
        attributes: ["projectId"],
        where: {
          studentId: receiverId,
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

          // delete join request when reciver student is in group
          await Notification.destroy({
            where: {
              senderId: senderId,
              reciverId: studentIdValue,
            },
          });
        }
      } else {
        // delete join request when reciver student is without group
        await Notification.destroy({
          where: {
            senderId: senderId,
            reciverId: receiverId,
          },
        });
      }
    } else {
      // fetch ProjectId associated with senderId
      senderProjectId = await Partnership.findOne({
        attributes: ["projectId"],
        where: {
          studentId: senderId,
        },
      });

      // delete send request to supervisor
      await Notification.destroy({
        where: {
          senderId: senderProjectId.projectId,
          reciverId: receiverId,
        },
      });
    }

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in deleting notification" });
  }
});

module.exports = router;

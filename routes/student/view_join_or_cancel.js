const express = require("express");
const router = express.Router();
const Notification = require("../../models/notification");
const Partnership = require("../../models/partnership");

router.get("/notification", async (req, res) => {
  try {
    let { senderId } = req.query;
    const { receiverId } = req.query;
    const { joinType } = req.query;

    if (joinType == "supervisor") {
      // fetch projectId associated with senderId
      projectId = await Partnership.findOne({
        attributes: ["projectId"],
        where: {
          studentId: senderId,
        },
      });
      senderId = projectId.projectId;
    }
    // Find all notifications associated with the senderId & receiverId
    const notification = await Notification.findOne({
      where: {
        senderId: senderId,
        reciverId: receiverId,
      },
    });

    if (notification) {
      res.json({ message: "cancel" });
    } else {
      res.json({ message: "join" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in viewing join or cancel button" });
  }
});

module.exports = router;

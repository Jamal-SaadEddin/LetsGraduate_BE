const express = require("express");
const router = express.Router();
const createNotification = require("../../functions/create_notification");

router.post("/request", async (req, res) => {
  try {
    const reciverId = req.body.reciverId;
    const senderId = req.body.senderId;
    const type = req.body.type;
    const content = req.body.content;
    const senderType = req.body.senderType;

    const requestCreated = await createNotification({
      reciverId,
      senderId,
      type,
      content,
      senderType,
    });

    if (requestCreated) {
      res.json({ message: "Notification created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in creating notification" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Notification = require("../../models/notification");

router.put("/readstatus", async (req, res) => {
  try {
    const { userId } = req.query;

    await Notification.update(
      { readStatus: "read" },
      {
        where: {
          reciverId: userId,
        },
        fields: ["readStatus"],
      }
    );

    res.json({
      message: "All notifications read status become read successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in updating read status of notifications" });
  }
});

module.exports = router;

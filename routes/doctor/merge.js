const express = require("express");
const router = express.Router();
const createNotification = require("../../functions/create_notification");
const MergedProject = require("../../models/mergedProject");
const Project = require("../../models/project");
const Notification = require("../../models/notification");
const extractProjectIds = require("../../functions/getid");

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

router.put("/response", async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const reciverId = req.body.reciverId;
    const type = req.body.type;
    const acceptStatus = req.body.acceptStatus;
    const notificationId = req.body.notificationId;
    const senderType = "doctor";

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
      content = "accepted to merge his/her group with your group";

      //add them in mergedProjects table
      const newMergedProject = await MergedProject.create({
        projectTitle: "project title " + reciverId,
      });

      //get projectId
      const mergedProjectId = await MergedProject.findOne({
        attributes: ["mergedProjectId"],
        where: {
          projectTitle: "project title " + reciverId,
        },
      });

      // get content of request notification
      const requestContent = await Notification.findOne({
        attributes: ["content"],
        where: {
          notificationId: notificationId,
        },
      });

      // get project id for every doctor
      const extractedIds = extractProjectIds(requestContent.content);

      //update the value of mergedProjectId column in project table for oth doctors
      if (extractedIds) {
        for (const projectId of extractedIds) {
          console.log(projectId);
          await Project.update(
            {
              mergedProjectId: mergedProjectId.mergedProjectId,
            },
            {
              where: {
                projectId: parseInt(projectId),
              },
              fields: ["mergedProjectId"],
            }
          );
        }
      }
    } else {
      content =
        "Unfortunately, I'm unable to merge my group with your group currently. Your understanding is appreciated. Thank you.";
    }

    // Send response to doctor
    requestCreated = await createNotification({
      reciverId,
      senderId,
      type,
      content,
      senderType,
    });

    if (requestCreated) {
      res.json({ message: "Merge response processed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing Merge response" });
  }
});

module.exports = router;

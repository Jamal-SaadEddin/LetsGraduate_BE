const Partnership = require("../models/partnership");
const Notification = require("../models/notification");

async function createNotification({
  reciverId,
  senderId,
  type,
  content,
  senderType,
}) {
  try {
    let projectId;
    let senderProjectId;
    let isRequestExisit = false;

    if (senderType === "student") {
      // Check if sender is within group
      projectId = await Partnership.findOne({
        attributes: ["projectId"],
        where: {
          studentId: reciverId,
        },
      });
    }

    if (senderType === "student" && projectId && type == "request") {
      // Find the studentsIds associated with the projectId
      const studentsIds = await Partnership.findAll({
        attributes: ["studentId"],
        where: {
          projectId: projectId.projectId,
        },
      });

      for (const studentId in studentsIds) {
        const studentIdValue = studentsIds[studentId].dataValues.studentId;

        // Send join request when receiver student is in group
        await Notification.create({
          senderId: senderId,
          reciverId: studentIdValue,
          readStatus: "unread",
          type: type,
          acceptStatus: "pending",
          content: content,
          dateCreated: new Date().toISOString(),
          senderType: senderType,
        });
      }
    } else if (senderType === "group") {
      // Check if sender is within group
      senderProjectId = await Partnership.findOne({
        attributes: ["projectId"],
        where: {
          studentId: senderId,
        },
      });

      // Check if sender's group sent request before
      const validate = await Notification.findOne({
        where: {
          senderId: senderProjectId.projectId,
        },
      });

      if (validate) {
        isRequestExisit = true;
      } else {
        // Send request to supervisor for supervising their group
        await Notification.create({
          senderId: senderProjectId.projectId,
          reciverId: reciverId,
          readStatus: "unread",
          type: type,
          acceptStatus: "pending",
          content: content,
          dateCreated: new Date().toISOString(),
          senderType: senderType,
        });
      }
    } else {
      let acceptStatus;
      let notifyButtonText = null;
      if (senderType == "student" && type == "request") {
        acceptStatus = "pending";
      } else {
        if (type == "comment") {
          notifyButtonText = "SHOW COMMENT";
        }
        acceptStatus = null;
      }

      // Send join request when receiver student is single (without group)
      await Notification.create({
        senderId: senderId,
        reciverId: reciverId,
        readStatus: "unread",
        type: type,
        acceptStatus: acceptStatus,
        content: content,
        dateCreated: new Date().toISOString(),
        notifyButtonText: notifyButtonText,
        senderType: senderType,
      });
    }

    return !isRequestExisit; // Return true if request was created successfully
  } catch (error) {
    console.error(error);
    throw new Error("Error in creating notification"); // Re-throw for handling in calling route
  }
}

module.exports = createNotification;

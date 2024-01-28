const express = require("express");
const router = express.Router();
const Notification = require("../../models/notification");
const Partnership = require("../../models/partnership");
const Student = require("../../models/student");
const Project = require("../../models/project");
const createNotification = require("../../functions/create_notification");

router.put("/response", async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const reciverId = req.body.reciverId;
    const type = req.body.type;
    const acceptStatus = req.body.acceptStatus;
    const notificationId = req.body.notificationId;
    const senderType = "student";

    // check if the sender within group
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: senderId,
      },
    });

    let content;
    let messageContent;
    if (acceptStatus == "accepted") {
      content = "welcome to join our group";
      messageContent = "is now new member in our group";
    } else {
      content =
        "Apologies, we won't be able to include you in our project group. Thank you for your understanding";
    }

    // when the student who receive join request within group
    if (projectId) {
      // get students IDs for every project based on projectId
      const studentsIds = await Partnership.findAll({
        attributes: ["studentId"],
        where: {
          projectId: projectId.projectId,
        },
      });

      let requestCreated1;
      let requestCreated2;

      // Send response to student
      requestCreated1 = await createNotification({
        reciverId,
        senderId,
        type,
        content,
        senderType,
      });

      // Send response for every student in the group
      for (const studentId in studentsIds) {
        const reciverId = studentsIds[studentId].dataValues.studentId;

        // update status of request notification from pending to accepted or declined
        await Notification.update(
          {
            acceptStatus: acceptStatus,
          },
          {
            where: {
              reciverId: reciverId,
              type: "request",
              senderType: "student",
            },
            fields: ["acceptStatus"],
          }
        );
      }

      if (acceptStatus == "accepted") {
        // Send message  to group
        requestCreated2 = await createNotification({
          reciverId: senderId,
          senderId: reciverId,
          type: type,
          content: messageContent,
          senderType: senderType,
        });
      }
      if (requestCreated1 && requestCreated2) {
        res.json({ message: "Supervision request edited successfully" });
      } else {
        res.json({
          message: "Supervision request doesn't edited successfully",
        });
      }
    }
    // when the student who receive join request without group
    else {
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

      const studentsIds = [senderId, reciverId];
      // get project type and department
      const student = await Student.findOne({
        attributes: ["projectType", "department"],
        where: {
          studentId: reciverId,
        },
      });

      let projectId1;
      // create new group
      const newProject = await Project.create({
        projectTitle: "project title " + reciverId,
        projectType: student.projectType,
        department: student.department,
      });

      //get projectId
      const project = await Project.findOne({
        attributes: ["projectId"],
        where: {
          projectTitle: "project title " + reciverId,
        },
      });

      for (const studentId of studentsIds) {
        // add them to partnership table
        const newGroup = await Partnership.create({
          studentId: studentId,
          projectId: project.projectId,
        });

        // update isWithGroup column
        await Student.update(
          {
            isWithGroup: true,
          },
          {
            where: {
              studentId: studentId,
            },
            fields: ["isWithGroup"],
          }
        );
      }

      // Send response to student
      const requestCreated = await createNotification({
        reciverId,
        senderId,
        type,
        content,
        senderType,
      });

      if (requestCreated) {
        res.json({ message: "Join request edited successfully" });
      } else {
        res.json({
          message: "Join request doesn't edited successfully",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing supervision request" });
  }
});

module.exports = router;

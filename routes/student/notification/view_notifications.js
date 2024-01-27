const express = require("express");
const router = express.Router();
const Partnership = require("../../../models/partnership");
const Notification = require("../../../models/notification");
const Student = require("../../../models/student");
const Project = require("../../../models/project");
const Doctor = require("../../../models/doctor");
const getDuration = require("../../../functions/find_notification_duration");

router.get("/notifications", async (req, res) => {
  try {
    const { userId } = req.query;

    // Find all notifications associated with the studentId
    const notifications = await Notification.findAll({
      where: {
        reciverId: userId,
      },
    });

    const editedNotifications = {};
    for (const notification in notifications) {
      const notificationData = notifications[notification];
      let notificationDate = notificationData.dateCreated;
      let date = new Date(notificationDate);
      if (notificationData.type === "comment") {
        // Find the projectId associated with the studentId
        const projectId = await Partnership.findOne({
          attributes: ["projectId"],
          where: {
            studentId: notificationData.reciverId,
          },
        });

        // Find supervisorId associated with the projectId
        const supervisorsIds = await Project.findAll({
          attributes: ["doctorId"],
          where: {
            projectId: projectId.projectId,
          },
        });

        // Check if comment from supervisor or Projects Committee
        for (const supervisorId in supervisorsIds) {
          const supervisorIdValue =
            supervisorsIds[supervisorId].dataValues.doctorId;
          if (notificationData.senderId == supervisorIdValue) {
            // Find the Name associated with the doctorId
            const sender = await Doctor.findOne({
              attributes: ["firstName", "lastName", "fullName"],
              where: {
                doctorId: supervisorIdValue,
              },
            });
            editedNotifications[notification] = {
              ...notificationData.dataValues,
              senderName: "Dr. " + sender.fullName,
              notificationDuration: getDuration(date),
            };
          } else {
            editedNotifications[notification] = {
              ...notificationData.dataValues,
              senderName: "Projects Committee",
              notificationDuration: getDuration(date),
            };
          }
        }
      } else if (notificationData.senderType === "group") {
        // handle if more than one member of group sent request

        if (Object.keys(editedNotifications).length == 0) {
          // Find groupIds associated with the projectId
          const groupIds = await Partnership.findAll({
            attributes: ["studentId"],
            where: {
              projectId: notificationData.senderId,
            },
          });
          let studentsNames = "";
          for (const studentId in groupIds) {
            const studentIdValue = groupIds[studentId].dataValues.studentId;
            // Find student name associated with the studentId
            const studentName = await Student.findOne({
              attributes: ["firstName", "lastName", "fullName"],
              where: {
                studentId: studentIdValue,
              },
            });
            studentsNames += studentName.fullName + ", ";
          }
          studentsNames = studentsNames.substring(0, studentsNames.length - 2);

          editedNotifications[notification] = {
            ...notificationData.dataValues,
            senderName: studentsNames,
            notificationDuration: getDuration(date),
          };
        } else {
          let notificationAdded = false;
          for (const editedNotification in editedNotifications) {
            const editedNotificationData =
              editedNotifications[editedNotification];
            if (notificationData.senderId === editedNotificationData.senderId) {
              notificationAdded = true;
            }
          }
          if (!notificationAdded) {
            // Find groupIds associated with the projectId
            const groupIds = await Partnership.findAll({
              attributes: ["studentId"],
              where: {
                projectId: notificationData.senderId,
              },
            });
            let studentsNames = "";
            for (const studentId in groupIds) {
              const studentIdValue = groupIds[studentId].dataValues.studentId;
              // Find student name associated with the studentId
              const studentName = await Student.findOne({
                attributes: ["firstName", "lastName", "fullName"],
                where: {
                  studentId: studentIdValue,
                },
              });
              studentsNames += studentName.fullName + ", ";
            }
            studentsNames = studentsNames.substring(
              0,
              studentsNames.length - 2
            );

            editedNotifications[notification] = {
              ...notificationData.dataValues,
              senderName: studentsNames,
              notificationDuration: getDuration(date),
            };
          }
        }
      } else {
        // // Find sender name associated with the senderId
        const studentName = await Student.findOne({
          attributes: ["firstName", "lastName", "fullName"],
          where: {
            studentId: notificationData.senderId,
          },
        });
        editedNotifications[notification] = {
          ...notificationData.dataValues,
          senderName: studentName.fullName,
          notificationDuration: getDuration(date),
        };
      }
    }

    res.json(Object.values(editedNotifications));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in viewing notifications" });
  }
});

module.exports = router;

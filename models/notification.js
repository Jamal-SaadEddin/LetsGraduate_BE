const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Notification = sequelize.define(
  "notifications",
  {
    notificationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    senderId: {
      type: Sequelize.INTEGER,
    },
    reciverId: {
      type: Sequelize.INTEGER,
    },
    readStatus: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    acceptStatus: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    dateCreated: {
      type: Sequelize.STRING,
    },
    notifyButtonText: {
      type: Sequelize.STRING,
    },
    senderType: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Notification;

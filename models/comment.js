const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define(
  "comments",
  {
    commentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    doctorId: {
      type: Sequelize.INTEGER,
    },
    projectId: {
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.STRING,
    },
    dateCreated: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Comment;

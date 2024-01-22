const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Submission = sequelize.define(
  "submissions",
  {
    submissionId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    projectId: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    file: {
      type: Sequelize.STRING,
    },
    acceptStatus: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Submission;

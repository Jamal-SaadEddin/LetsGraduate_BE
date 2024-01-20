const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Prerequisite = sequelize.define(
  "partnerships",
  {
    studentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    projectId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Prerequisite;

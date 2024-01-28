const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Partnership = sequelize.define(
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

module.exports = Partnership;

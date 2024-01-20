const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Prerequisite = sequelize.define(
  "prerequisites",
  {
    prerequisiteId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    department: {
      type: Sequelize.STRING,
    },
    projectType: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Prerequisite;

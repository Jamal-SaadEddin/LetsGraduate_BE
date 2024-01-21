const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define(
  "projects",
  {
    projectId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    projectTitle: {
      type: Sequelize.STRING,
    },
    doctorId: {
      type: Sequelize.INTEGER,
    },
    mergedProjectId: {
      type: Sequelize.INTEGER,
    },
    projectType: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Project;

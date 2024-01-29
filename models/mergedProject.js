const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const MergedProject = sequelize.define(
  "mergedProjects",
  {
    mergedProjectId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    projectTitle: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = MergedProject;

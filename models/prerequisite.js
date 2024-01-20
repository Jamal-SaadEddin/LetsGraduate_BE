const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Prerequisite = sequelize.define("prerequisites", {
  prerequisiteId: {
    type: Sequelize.INTEGER,
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
});

module.exports = Prerequisite;

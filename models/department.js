const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define(
  "departments",
  {
    departmentName: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    maxNoOfStuPerProj: {
      type: Sequelize.INTEGER,
    },
    maxNoOfProjPerDoct: {
      type: Sequelize.INTEGER,
    },
    maxNoOfStuPerDoct: {
      type: Sequelize.INTEGER,
    },
    currentPeriod: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Department;

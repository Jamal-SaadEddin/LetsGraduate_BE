const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Doctor = sequelize.define(
  "doctors",
  {
    doctorId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!");
      },
    },
    email: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    mobileNumber: {
      type: Sequelize.STRING,
    },
    isSupervisor: {
      type: Sequelize.BOOLEAN,
    },
    isDepartmentManager: {
      type: Sequelize.BOOLEAN,
    },
    isProjectsCommitteeMember: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Doctor;

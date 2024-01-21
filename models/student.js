const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define(
  "students",
  {
    studentId: {
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
    gp1State: {
      type: Sequelize.STRING,
    },
    gp2State: {
      type: Sequelize.STRING,
    },
    projectType: {
      type: Sequelize.STRING,
    },
    isWithGroup: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Student;

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "users",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;

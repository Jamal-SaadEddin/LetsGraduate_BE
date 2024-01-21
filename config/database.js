const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "lets_graduate",
  "lets_grduate_user",
  "yCQpW1UikjMApHzk",
  {
    host: "18.157.127.87",
    dialect: "mysql",
  }
);

module.exports = sequelize;

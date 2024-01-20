const Sequelize = require("sequelize");

const sequelize = new Sequelize("letsgraduate", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

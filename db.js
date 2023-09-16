const { Sequelize } = require("sequelize");

module.exports = new Sequelize("postgres", "albert", "albert", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

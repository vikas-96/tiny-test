const Sequelize = require("sequelize");
const config = require(`${__dirname}/../config/config.json`)["development"];

module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operatorAliases: 0,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

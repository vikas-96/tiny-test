const Sequelize = require("sequelize");
const db = require("../config/database");

const Cat = db.define(
  "cats",
  {
    catname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    catage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    catcolor: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Cats",
    timestamps: true,
  }
);

module.exports = Cat;

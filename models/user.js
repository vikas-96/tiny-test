const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "users",
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = User;

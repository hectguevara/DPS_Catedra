const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DailyQuote = sequelize.define("DailyQuote", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = DailyQuote;

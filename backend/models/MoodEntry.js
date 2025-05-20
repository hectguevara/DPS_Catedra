const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MoodEntry = sequelize.define("MoodEntry", {
  emotion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = MoodEntry;

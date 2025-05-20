const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EducationalContent = sequelize.define("EducationalContent", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  intro: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  articleUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = EducationalContent;

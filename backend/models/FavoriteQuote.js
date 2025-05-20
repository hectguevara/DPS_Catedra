const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definir el modelo FavoriteQuote
const FavoriteQuote = sequelize.define("FavoriteQuote", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relación entre User y FavoriteQuote
FavoriteQuote.associate = (models) => {
  FavoriteQuote.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = FavoriteQuote;

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const User = require("./models/User");
const MoodEntry = require("./models/MoodEntry");
const EducationalContent = require("./models/EducationalContent");
const FavoriteQuote = require("./models/FavoriteQuote");
const DailyQuote = require("./models/DailyQuote");

User.hasMany(MoodEntry, { foreignKey: "userId" });
MoodEntry.belongsTo(User, { foreignKey: "userId" });

const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const educationalRoutes = require("./routes/educational");
const quoteRoutes = require("./routes/quotes");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/educational", educationalRoutes);
app.use("/api/quotes", quoteRoutes);

const PORT = process.env.PORT || 4000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

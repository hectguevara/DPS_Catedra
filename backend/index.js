const express = require("express");
const cors = require("cors");

// Cargar el archivo .env o .env.production según el entorno (local o producción)
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path:
    ENV === "production" ? path.resolve(__dirname, ".env.production") : ".env",
});

const sequelize = require("./config/database");
const User = require("./models/User");
const MoodEntry = require("./models/MoodEntry");
const EducationalContent = require("./models/EducationalContent");
const FavoriteQuote = require("./models/FavoriteQuote");
const DailyQuote = require("./models/DailyQuote");

// Definir relaciones entre modelos
User.hasMany(MoodEntry, { foreignKey: "userId" });
MoodEntry.belongsTo(User, { foreignKey: "userId" });

const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const educationRoutes = require("./routes/education");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/education", educationRoutes);

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;

// Sincronizar base de datos y arrancar servidor
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

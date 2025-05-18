const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const User = require("./models/User");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

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

const express = require("express");
const axios = require("axios");
const { Op } = require("sequelize");

const authMiddleware = require("../middleware/authMiddleware");
const EducationalContent = require("../models/EducationalContent");
const FavoriteQuote = require("../models/FavoriteQuote");
const DailyQuote = require("../models/DailyQuote");

const router = express.Router();

// Obtener todo el contenido educativo
router.get("/articles", async (req, res) => {
  try {
    const articles = await EducationalContent.findAll();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener contenido" });
  }
});

// Obtener una frase aleatoria del día
router.get("/daily-quote", async (req, res) => {
  try {
    const quote = await DailyQuote.findOne({
      order: sequelize.random(),
    });

    if (!quote) {
      return res.status(404).json({ message: "No hay frases disponibles" });
    }

    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener frase del día" });
  }
});

// Guardar frase favorita
router.post("/favorite-quote", authMiddleware, async (req, res) => {
  const { text, author } = req.body;
  try {
    const quote = await FavoriteQuote.create({
      text,
      author,
      userId: req.user.id,
      userName: req.user.name,
    });
    res.status(201).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar frase favorita" });
  }
});

// Ver frases favoritas del usuario
router.get("/favorite-quotes", authMiddleware, async (req, res) => {
  try {
    const quotes = await FavoriteQuote.findAll({
      where: { userId: req.user.id },
    });
    res.json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener frases favoritas" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const MoodEntry = require("../models/MoodEntry");
const authMiddleware = require("../middleware/authMiddleware");
const { Op } = require("sequelize");

// Crear nueva entrada de estado de ánimo
router.post("/", authMiddleware, async (req, res) => {
  const { emotion, description } = req.body;
  try {
    const entry = await MoodEntry.create({
      emotion,
      description,
      userId: req.user.id,
      date: new Date().toISOString().split("T")[0], // Solo YYYY-MM-DD
    });
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar entrada emocional" });
  }
});

// Obtener historial (opcionalmente filtrado)
router.get("/", authMiddleware, async (req, res) => {
  const { emotion, date } = req.query;
  const filters = { userId: req.user.id };

  if (emotion) filters.emotion = emotion;
  if (date) filters.date = date; // Debe ser formato YYYY-MM-DD

  try {
    const entries = await MoodEntry.findAll({
      where: filters,
      order: [["date", "DESC"]],
    });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener historial" });
  }
});

module.exports = router;

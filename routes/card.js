const express = require("express");
const router = express.Router();

const Card = require("../models/Card");

// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});

// Get card by id
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) return res.status(404).json({ msg: "Card not found" });

    res.json(card);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});

// Create new card
router.post("/", async (req, res) => {
  try {
    const { question, answer, deck } = req.body;

    const newCard = new Card({
      question,
      answer,
      deck,
    });

    const card = await newCard.save();

    res.json(card);
  } catch (error) {
    console.error("Server error", error);
    res.status(500).send("Server error");
  }
});

// Update card
router.put("/:id", async (req, res) => {

    try {
        const { question, answer, deck } = req.body;
    
        const newCard = {
        question,
        answer,
        deck,
        };
    
        const card = await Card.findByIdAndUpdate(
        req.params.id,
        newCard,
        { new: true }
        );
    
        res.json(card);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
    }
);

// Delete card
router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) return res.status(404).json({ msg: "Card not found" });

    await card.remove();

    res.json({ msg: "Card removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

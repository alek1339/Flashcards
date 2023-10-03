const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

const calculateNextReviewDate = require("../utils/reviewDateCalculator");

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});

// Get review by id
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ msg: "Review not found" });

    res.json(review);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});

// Create new review
router.post("/", async (req, res) => {
  try {
    const { cardId, userId, isCorrectGuess } = req.body;
    const repetitions = 1;
    const nextReviewDate = calculateNextReviewDate(repetitions, isCorrectGuess);
    const newReview = new Review({
      cardId,
      userId,
      nextReviewDate,
      repetitions,
    });

    const review = await newReview.save();

    res.json(review);
  } catch (error) {
    console.error("Server error", error);
    res.status(500).send("Server error");
  }
});

// Update review
router.put("/:id", async (req, res) => {

    try {
        const { cardId, userId, isCorrectGuess, repetitions } = req.body;
        console.log(req.body);
        const nextReviewDate = calculateNextReviewDate(repetitions, isCorrectGuess);

        const newReview = {
            cardId,
            userId,
            nextReviewDate,
            repetitions: repetitions,
        };
    
        const review = await Review.findByIdAndUpdate(
        req.params.id,
        newReview
        );
    
        res.json(review);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// Delete review
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ msg: "Review not found" });

    await review.remove();

    res.json({ msg: "Review removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
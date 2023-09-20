const express = require('express');
const router = express.Router();

const Deck = require('../models/Deck');
const Card = require('../models/Card');
const Review = require('../models/Review');

// Get all decks
router.get('/', async (req, res) => {
    try {
        const decks = await Deck.find();
        res.json(decks);
    } catch (error) {
        res.status(500).send('Server error' + error);
    }
});

// Get deck by id
router.get('/:id', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);

        if (!deck) return res.status(404).json({ msg: 'Deck not found' });

        res.json(deck);
    } catch (error) {
        res.status(500).send('Server error' + error);
    }
});

// Get deck by user id
router.get('/user/:id', async (req, res) => {
    try {
        const decks = await Deck.find({ userId: req.params.id });

        if (!decks) return res.status(404).json({ msg: 'Decks not found' });

        res.json(decks);
    } catch (error) {
        res.status(500).send('Server error' + error);
    }
});

// Route to get both cards in review and new cards for learning
router.get('/decks/:deckId/cards-for-learning/:userId', async (req, res) => {
    try {
      const deckId = req.params.deckId;
      const userId = req.params.userId;
  
      // Find all cards in the specified deck
      const allCardsInDeck = await Card.find({ deckId });
  
      // Find cards in the deck that are not in the user's review queue
      const cardsNotInReview = [];
      const cardsInReview = [];
  
      for (const card of allCardsInDeck) {
        const review = await Review.findOne({ cardId: card._id, userId });
        if (!review) {
          cardsNotInReview.push(card);
        } else {
            cardsInReview.push(card);
        }
      }
  
      res.json({ allCardsInDeck: allCardsInDeck, newCardsForLearning: cardsNotInReview, cardsInReview: cardsInReview });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Create new deck
router.post('/', async (req, res) => {
    try {
        const { name, userId } = req.body;
        console.log(req.body);

        const newDeck = new Deck({
            name,
            userId
        });

        const deck = await newDeck.save();

        res.json(deck);
    } catch (error) {
        console.error('Server error', error);
        res.status(500).send('Server error');
    }
});

// Update deck
router.put('/:id', async (req, res) => {

    try {
        const { name, description, cards } = req.body;

        const newDeck = {
            name,
            description,
            cards,
        };

        const deck = await Deck.findByIdAndUpdate(
            req.params.id,
            newDeck,
            { new: true }
        );

        res.json(deck);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Delete deck
router.delete('/:id', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);

        if (!deck) return res.status(404).json({ msg: 'Deck not found' });

        await deck.remove();

        res.json({ msg: 'Deck removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
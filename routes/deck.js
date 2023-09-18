const express = require('express');
const router = express.Router();

const Deck = require('../models/Deck');

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

// Create new deck
router.post('/', async (req, res) => {
    try {
        const { name, description, cards } = req.body;

        const newDeck = new Deck({
            name,
            description,
            cards,
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
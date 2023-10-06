const express = require('express');
const router = express.Router();

const Profile = require('../models/Profile');

// Get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        console.error('Server error', error);
        res.status(500).send('Server error');
    }
});

// Get profile by id
router.get('/:id', async (req, res) => {

    try {
        const profile = await Profile.findOne({user: req.params.id});
        if (!profile) return res.json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Create new profile
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, user } = req.body;

        const newProfile = new Profile({
            firstName,
            lastName,
            user,
            favoriteMovies: [],
        });

        const profile = await newProfile.save();

        res.json(profile);
    } catch (error) {
        console.error('Server error', error);
        res.status(500).send('Server error');
    }
});


// Update profile
router.put('/:id', async (req, res) => {
    try {
        const { firstName, lastName, favoriteMovies } = req.body;

        const newProfile = {
            firstName,
            lastName,
            favoriteMovies,
        };

        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            newProfile,
            { new: true }
        );

        res.json(profile);
    } catch (error) {
        console.error('Server error', error);
        res.status(500).send('Server error');
    }
});

// Delete profile
router.delete('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) return res.status(404).json({ msg: 'Profile not found' });

        await profile.remove();

        res.json({ msg: 'Profile removed' });
    } catch (error) {
        console.error('Server error', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
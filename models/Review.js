const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    cardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    nextReviewDate: {
        type: Date,
        required: true,
    },
    repetitions: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model('Review', reviewSchema);
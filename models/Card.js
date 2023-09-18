const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
   front: {
       type: String,
       required: true,
   },
    back: {
         type: String,
         required: true,
    },
    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
    },
});

module.exports = mongoose.model('Card', cardSchema);
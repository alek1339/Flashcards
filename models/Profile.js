const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 99,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 99,
    },
});

module.exports = mongoose.model('Profile', ProfileSchema);
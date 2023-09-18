const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    imdbID: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Year: {
      type: String,
      required: true,
    },
    Poster: {
      type: String,
    },
    Type: {
      type: String,
    },
  });

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
    favoriteMovies: [MovieSchema],
});

module.exports = mongoose.model('Profile', ProfileSchema);
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Scores = mongoose.model('Scores', scoreSchema);

module.exports = Scores;

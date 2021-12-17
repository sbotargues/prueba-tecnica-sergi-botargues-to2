const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  song_name: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
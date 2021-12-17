const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  song_name: {
    type: String,
    required: true
  },
  band: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
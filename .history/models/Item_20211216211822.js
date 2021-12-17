const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  song_name: {
    type: String,
    required: true
  },
  band: {
    type: String
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
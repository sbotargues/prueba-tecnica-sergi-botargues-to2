const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  song_name: {
    type: String,
    required: true
  },
  date: 
});

module.exports = Item = mongoose.model('item', ItemSchema);
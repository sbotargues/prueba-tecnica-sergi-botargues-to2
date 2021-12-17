const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  band: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
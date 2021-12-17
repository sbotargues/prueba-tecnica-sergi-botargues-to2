const express = require('express');
const mongoose = require('mongoose');
const fs = require ('fs');
const parse = require('csv-parser');

const app = express();

csv= fs.readFileSync('song_list.csv')

let result = [];
 
let headers = array[0].split(", ")
 
for (let i = 1; i < array.length - 1; i++) {
  let obj = {}
 
  let str = array[i]
  let s = ''
 
  let flag = 0
  for (let ch of str) {
    if (ch === '"' && flag === 0) {
      flag = 1
    }
    else if (ch === '"' && flag == 1) flag = 0
    if (ch === ', ' && flag === 0) ch = '|'
    if (ch !== '"') s += ch
  }
 
  let properties = s.split("|")
 
  // For each header, if the value contains
  // multiple comma separated data, then we
  // store it in the form of array otherwise
  // directly the value is stored
  for (let j in headers) {
    if (properties[j].includes(", ")) {
      obj[headers[j]] = properties[j]
        .split(", ").map(item => item.trim())
    }
    else obj[headers[j]] = properties[j]
  }
 
  // Add the generated object to our
  // result array
  result.push(obj)
}
 
// Convert the resultant array to json and
// generate the JSON output file.
let json = JSON.stringify(result);
fs.writeFileSync('output.json', json);

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('../models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    band: req.body.band,
    year: req.body.year
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
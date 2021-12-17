const express = require('express');
const mongoose = require('mongoose');
const CSVToJSON = require('csvtojson');

const app = express();

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

// request csv and convert to json
CSVToJSON().fromFile('song_list.csv')
    .then(items => {
        // items is a JSON array
        // log the JSON array
        console.log('SONGS',items);
    }).catch(err => {
        // log error if any
        console.log(err);
    });

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', async (req, res) => {
    const csvfilepath = await req.body.file;
   await csvtojson().fromFile(csvfilepath).then((json) => {
      var i;
      for (i = 0; i < json.length; i++) {
        console.log(json[i].fname)     //console.log prints all the entries
  const newItem = new Item({
    name: req.body.name,
    band: req.body.band,
    year: req.body.year
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
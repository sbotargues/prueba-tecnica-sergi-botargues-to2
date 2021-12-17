const express = require('express');
const mongoose = require('mongoose');

const app = express();

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

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
  const newItem = new Item();
  Item.song_name = req.body.song_name;
  Item.band = req.body.band,
  Item.year = req.body.year,
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
var express     = require('express');
var mongoose    = require('mongoose');
var multer      = require('multer');
var path        = require('path');
var csvModel    = require('./models/csv');
var csv         = require('csvtojson');
var bodyParser  = require('body-parser');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

var uploads = multer({storage:storage});

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
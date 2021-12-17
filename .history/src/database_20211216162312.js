const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mydatabase')
    .then(db => console.log('Db is connected to'))
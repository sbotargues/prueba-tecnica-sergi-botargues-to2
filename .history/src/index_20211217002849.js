const express = require('express');
const mongoose = require('mongoose');
const CSVToJSON = require('csvtojson');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// request csv and convert to json
CSVToJSON().fromFile('song_list.csv')
    .then(items => {
        




        console.log('SONGS',items);
    }).catch(err => {
        // log error if any
        console.log(err);
    });


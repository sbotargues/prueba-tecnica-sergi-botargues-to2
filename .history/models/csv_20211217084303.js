var mongoose  =  require('mongoose');

var csvSchema = new mongoose.Schema({
    song_name:{
        type:String
    },
    band:{
        type:String
    },
    year:{
        type:String
    },
});

module.exports = mongoose.model('songs list',csvSchema);
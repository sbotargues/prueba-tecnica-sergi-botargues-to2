var mongoose  =  require('mongoose');

var csvSchema = new mongoose.Schema({
    song_name:{
        type:String
    },
    LastName:{
        type:String
    },
    SSN:{
        type:String
    },
});

module.exports = mongoose.model('studentsrecords',csvSchema);
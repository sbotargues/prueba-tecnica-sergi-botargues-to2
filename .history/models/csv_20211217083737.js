var mongoose  =  require('mongoose');

var csvSchema = new mongoose.Schema({
    FirstName:{
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
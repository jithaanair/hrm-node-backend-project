var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    jname:String,
    jdesc:String,
    
});

module.exports = mongoose.model('Job',jobSchema);
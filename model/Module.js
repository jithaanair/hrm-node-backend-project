var mongoose = require('mongoose');

var moduleSchema = new mongoose.Schema({
    mname:String,
    level:Number,
    parent:Number,
    mdesc:String
});

module.exports = mongoose.model('Module',moduleSchema);
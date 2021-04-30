var mongoose = require('mongoose');

var moduleSchema = new mongoose.Schema({
    logo:String,
    name:String,
    phone:String,
    email:String,
    siteadd:String,
    location:String,
    desc:String
});

module.exports = mongoose.model('Institution',moduleSchema);
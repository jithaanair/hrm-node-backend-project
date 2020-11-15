var mongoose = require('mongoose');

var orgSchema = new mongoose.Schema({
    pid:String,
    id:String,
    title:String,
    name:String,
    image:String,
    from:String,
    to:String,
    column:Number,
    offset:Number,
    layout:Number
});

module.exports = mongoose.model('Orgchart',orgSchema);
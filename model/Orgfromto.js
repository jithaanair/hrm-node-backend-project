var mongoose = require('mongoose')
,Schema = mongoose.Schema,
Mixed = Schema.Types.Mixed;

var dta = new mongoose.Schema({
    from: String,
    to: String
});

var orgdta = new mongoose.Schema({
     title: {
        type: Mixed,
        default:[]
     }    
});
module.exports = mongoose.model('Orgfromto',orgdta);
var mongoose = require('mongoose');

var moduleSchema = new mongoose.Schema({
    iname:String,
    icategory:{
        name:String,
        icon:String
    },
    icond:{
        type:String,
        enum: ['GOOD CONDITION', 'NEEDS SERVICE', 'NOT WORKING'],
        default: 'GOOD CONDITION'
    },
    assignee: {
        type: String,
        ref: 'Userdetail'
    },
});

module.exports = mongoose.model('Inventory',moduleSchema);
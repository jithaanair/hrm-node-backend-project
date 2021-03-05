var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp2');

// Defines the collection Tasks
var scheduleSchema = new mongoose.Schema({
   
    title: { type: String, required: true },
    desc: { type:String, required: true },
    startTime: String,
    endTime: String,
    assignee: {
        type: String,
        ref: 'Userdetail'
    },
    allday:{
        type:Boolean,
        default:false
    }
});

scheduleSchema.plugin(timestamps);

module.exports = mongoose.model('Schedule', scheduleSchema);

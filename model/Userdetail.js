var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp2');

// Defines the collection Boards
var userdetailSchema = new mongoose.Schema({
    PID: {
        type: String,
        ref: 'User'
    },
    fname:{
       type: String,
       required:true
    },
    lname:
    {
      type:String,
      required:true
    },
    jdate:{
      type:Date
    },
    ldate:{
        type:Date
    },
    bgroup:{
    type:String
    },
    address:{
        type:String
        
    },
    avatar:{
        type:String
    },
    jobid: {
            type: String,
            ref: 'Job'
    },
    mid: {
            type: String,
            ref: 'Module'
    },
    role:{        
        type: String,
        enum: ['Admin', 'User'],
        default:'User'
    
}
});

userdetailSchema.plugin(timestamps);
module.exports = mongoose.model('Userdetail', userdetailSchema);

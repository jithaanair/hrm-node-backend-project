var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp2');

var invitationSchema = new mongoose.Schema ({
    from: {
        type:String,
        ref:'Userdetail'
    },
    to: {
        type:String,
        ref:'Userdetail'
    },
    board:{
        type:String,
        ref:'Schedule'
    }
});

invitationSchema.index ({ to: 1,board: 1},{unique: true});

invitationSchema.plugin(timestamps);

module.exports = mongoose.model('Invitation',invitationSchema);


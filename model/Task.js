var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp2');

// Defines the collection Tasks
var taskSchema = new mongoose.Schema({
   
    tid:   { type:Number,required:true,unique:true },
    tname: { type: String, required: true },
    tdesc: { type:String, required: true },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    },
    type: {
        type:String,
        enum: ['MEETINGS','EVENTS','WORK'],
        default: 'WORK'
    },
    start_date: Number,
    due_date: Number,
    assignee: {
        type: String,
        ref: 'Userdetail'
    },
    creator: {
        type: String,
        ref: 'Userdetail'
    },
    // mid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Module'
    // },
    // comments: [
    //     {
    //         text: String,
    //         created_at: Date,
    //         user: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'User'
    //         }
    //     }
    // ],
    attachments : { type : Array , "default" : [] },
    // attachments: [{
    //         name:
    //         {
    //             type:String
    //         },
    //         url:
    //         {
    //           type:String
    //         }
    // }],
    status:{
    type: String,
    enum: ['In Progress', 'Completed', 'Pending'],
    default:'In Progress'
}
});

taskSchema.plugin(timestamps);

module.exports = mongoose.model('Task', taskSchema);

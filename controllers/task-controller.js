var Task = require('../model/Task');
const User = require('../model/User');
var emailCtrl= require('../controllers/email-controller');
const Userdetail = require('../model/Userdetail');

exports.getOwnTasks = function (req,res) {

    const uid=req.user.id;
    console.log(uid);
    Task.find({assignee:uid})
    //.populate({'path':'creator'})
   // .populate({'path':'assignee'})
    .select('tid tname start_date due_date status priority -_id')
    .exec((err,tasks)=> {
        if(err) {
            console.log(error);
            return res.status(400).json(err);
        }
        console.log(tasks);
       res.json(tasks);
    });     
    
    // let filter = {};
    // console.log("inside getown");
    // const uid="5f80c1f9c277a12a2cb0d7be";
    // filter = {assignee:uid};
    // Task.find(filter,(err,task)=>{
    //     if(err){
    //         return res.status(400).json(err);
    //     }
    //     res.json(task);
    // });
 }

    // console.log(req.params.assignee);
    // Task.find({assignee:req.params.assignee},(err,tasks)=>{
    //     if(err){
    //     return res.status(400).json(err);
    //     }
    //     res.json(tasks);
    // });
   


exports.createTask =async function(req,res) {
 //   console.log("inside create task");
    var newTask = Task(req.body);
    var userId = req.user.id;
    newTask.creator = userId;

    Task.findOne()
    .sort('-tid')
    .select('tid -_id') 
    .exec((err, taskid)=> {
      //  console.log(taskid.tid);
        newTask.tid=taskid.tid+1;
     //  console.log(newTask.tid);
      if(err){
  //         console.log(err);
           }
   // console.log(newTask);
    newTask.save((err,task)=> {
        if(err) {
    //        console.log(error);
            return res.status(400).json(err);
        }
        res.status(201).json(task);
    });
    });
};
    

    
    
    

        // if(task.creator != task.assignee) {
        //     User.findById(task.assignee,(err,user)=> {
        //         if(user) {
        //             emailCtrl.sendNewTaskEmail(user,task);
        //         }
        //     });
        // }


exports.getTask = async function(req,res) {
  //  console.log("inside here");
  //  console.log(req.params.tid);
    await Task.find({tid:req.params.tid})
    .populate("creator assignee")
    //.populate({'path':'creator',select:{'fname + lname'}})
    //.populate({'path':'assignee'})
    .exec((err,task)=>{
      if(task==""){
          console.log("Task Id not found!!!");
        return  res.status(400).json({"Msg":"Please enter task id"});
      }
    //  console.log(task.creator);
     // console.log(task.assignee);
      res.json(task);
     // console.log(task);
    });
};

exports.updateTask = function(req,res) {
   // console.log("inside update",req.params.id);
   // console.log(req.body);
    Task.findOneAndUpdate({tid:req.params.id},req.body,{new:false})
    //.populate({'path':'creator',select: 'fname'})
    //.populate({'path':'assignee',select: 'lname'})
    .exec((err,tasks) =>{
        if(err) {
          //  console.log(err);
            return res.status(400).json(err);
        }
        // if(task.assignee!= req.body.assignee){
        //     User.findById(req.body.assignee,(err,user)=>{
        //         if(user) {
        //             emailCtrl.sendNewTaskEmail(user,task);
        //         }
        //     });
        // }
        res.json(tasks);
    });
};

exports.deleteTask = function(req,res) {
  //  console.log(req.params.id);
    Task.findOneAndDelete({tid:req.params.id}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted User : ", docs); 
        } 
    }); 
}
    // Task.findOneAndDelete({tid:req.params.id})
    // .exec(err,res => {
    //     if(err) {
    //         console.log(err);
    //         return res.status(400).json(err);
    //     }
        
    // });
    // res.json(res);
//}

exports.addAttachment = function(req,res) {
   // console.log(req.params.id);
  //  console.log(req.body);
    //console.log(req.headers['Content-Disposition']);
   // req.body.created_at = new Date().getTime();
    
Task.findOneAndUpdate({tid:req.params.id},{$push : {attachments: req.body}}, {new:true},(err,task)=>{
   if(err) {
       return res.status(400).json(err);
   }
   return res.json(task);

});
};

exports.addAWSAttachement = function(req,res) {
   // console.log("inside AWS attachement");
    req.body.created_at = new Date().getTime();

    Task.findOneAndUpdate({tid:req.params.id}, { $push: { attachments: req.body}}, { new: true }, (err, task) => {
        if (err) {
           // console.log(err);
            return res.status(400).json(err);
        }

        return res.json(task);
    });


}

// await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
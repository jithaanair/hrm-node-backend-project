var Schedule = require('../model/Schedule');
var emailCtrl= require('../controllers/email-controller');


exports.getTodaysEvents = function(req,res) {
 const uid = req.user.id;
 console.log("uid",uid);
 var current = new Date();
 var todaydate=current.toISOString();
 console.log(todaydate);
 Schedule.find({$and:[{assignee:uid}, {startTime:{ $gte: todaydate } }]})
 //Schedule.find({assignee:uid})
 .exec((err,events)=>{
     if(err){
         console.log(error);
         return res.status(400).json(err);
     }
     console.log(events);
     res.json(events);
 });
}

exports.getOwnEvents = function (req,res) {

    const uid=req.user.id;
    console.log(uid);
    Schedule.find({assignee:uid})
    .exec((err,events)=> {
        if(err) {
            console.log(error);
            return res.status(400).json(err);
        }
        console.log(events);
       res.json(events);
    });      
 }

exports.createEvent =async function(req,res) {
    console.log("inside create event");
    console.log(req.body);
    var newEvent = Schedule(req.body);
    var userId = req.user.id;
    newEvent.assignee = userId;
    newEvent.save((err,event)=> {
        if(err) {
            return res.status(400).json(err);
        }
    res.status(201).json(event);
    });
};
    

    
    
    

        

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
   console.log(req.params.id);
   console.log(req.body);
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
    console.log("inside AWS attachement");
    console.log(req.body);
    req.body.created_at = new Date().getTime();

    Task.findOne({$and: [{tid:req.params.id}, {"attachments.name":req.body.name }]}, (err, task) => {
        if (task?.tid == req.params.id) {
            console.log("inside same task id");
            console.log("inside same task id",task);
            Task.findOneAndUpdate({$and: [{tid:req.params.id}, {"attachments.name":req.body.name }]},{$push : {"attachments.created_at": req.body.created_at}},{new:true},(err,task)=>{            
           return res.json(task);
        });
    }
        else {
    Task.findOneAndUpdate({tid:req.params.id},{$push : {attachments: req.body}},{new:true},(err,task)=>{    
        console.log(task)
        return res.json(task);
    });
}

 });

}

// await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
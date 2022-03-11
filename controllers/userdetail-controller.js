const Task = require('../model/Task');
var Userdetail = require('../model/Userdetail');
var OrgCtrl = require('../controllers/orgfromto-controller');
var jobCtrl = require('../controllers/job-controller');
// exports.addUser = function(req,res) {
//     let userId = req.user.id;
//     let newTask = Userdetail(req.body);
//     newTask.creator = userId;
//     newTask.save((err,task)=> {
//         if(err) {
//             return res.status(400).json(err);
//         }
//         res.status(201).json(task);
//     });
// };

exports.getAllUsers = function(req,res) {
    console.log("here");
    Userdetail.find()
    .populate({'path':'jobid mid','select':'jdesc mname'})
    .exec((err,users)=>{
        if(err){
            console.log(err);
            return res.status(400).json(err);
        }
        console.log(users);
       res.json(users);
    });
}

exports.getUsers = function(req,res) {
    var userrole;
    console.log("inside getusers");
    Userdetail.findById(req.user.id).select('role -_id')
    .exec((err,role)=>{
        console.log(role);
        if(role.role!="User")
        {
           if(role.role=="Admin")
           {
               userrole="User";
           }

   // .populate({'path':'creator'})
   // .populate({'path':'assignee'})
   Userdetail.find({role:userrole})
    .select('PID fname lname -_id')
    .exec((err,users)=> {
        if(err) {
            console.log(err);
            return res.status(400).json(err);
        }
        console.log(users);
       res.json(users);
    });  
}
        else{
            console.log("inside return");
            return;
        }
});
}

exports.getMemberId = function(req,res) {
    
    console.log(req.params.id);
    Userdetail.findById(req.params.id)
    .populate({'path':'jobid','select':'jdesc'})
    .exec((err,members)=>{
        if(err) {
            console.log(err);
            return res.status(400).json(err);
        }
        console.log(members);
       return res.json(members);
    });
}

exports.getMembers = function(req,res) {
    var clonedObjArray = new Array();
    var orgmembers = new Array();
    var members = [];

    var user = req.user.id;
    Userdetail.findById(user)
    .select('jobid')
    .populate({path:'jobid',select:'jname -_id'})
    .exec((err,jid)=>{
        jobid=jid.jobid.jname;
        console.log(jobid);
        orgmembers=OrgCtrl.getHMembers(jobid);
        console.log("Orgmembers",orgmembers);
    });
    setTimeout(function(){
        console.log("length",orgmembers);
        if (orgmembers=='')
        {
            return res.json('');
        }
        orgmembers.forEach(function(orgmember){
         console.log(orgmember);
         jobCtrl.findJob(orgmember);          
 });
 }, 300);
 setTimeout(function(){
     
    //console.log(jobCtrl.jobArray);
 
     
        Userdetail.find({jobid:jobCtrl.jobArray})
        .select('PID fname lname avatar -_id')
        .populate({path:'jobid',select:'jdesc -_id'})
        .exec((err,members)=>{
            if(err){
                console.log(err);
                res.status(400).json(err);
            }
            //members.push(memb);
           console.log("Members",members);
           var resultPosts = members.map(function(mem){
            // console.log(mem);
             var tmppost=mem.toObject();
             tmppost.progress = 0;
             tmppost.pending = 0;
             tmppost.completed = 0;
             return tmppost;
         });
         clonedObjArray = [...resultPosts];
        });
       
     
 },500);
 
 setTimeout(function(){
    
     
     //console.log("cloe",clonedObjArray);
     clonedObjArray.forEach((err,taskslist)=>{
      Task.find({assignee:clonedObjArray[taskslist].PID,status:"In Progress"})
      .countDocuments()
      .exec((err,progress1)=>{
          
          clonedObjArray[taskslist].progress= progress1;
          console.log(taskslist,clonedObjArray[taskslist]);
         console.log(clonedObjArray);
          //return res.json(clonedObjArray);
      });  
      Task.find({assignee:clonedObjArray[taskslist].PID,status:"Completed"})
      .countDocuments()
      .exec((err,progress2)=>{
          
          clonedObjArray[taskslist].completed= progress2;
          console.log(taskslist,clonedObjArray[taskslist]);
          console.log(clonedObjArray);
          
      });
      Task.find({assignee:clonedObjArray[taskslist].PID,status:"Pending"})
      .countDocuments()
      .exec((err,progress3)=>{
          
          clonedObjArray[taskslist].pending= progress3;
         console.log(taskslist,clonedObjArray[taskslist]);
         console.log(clonedObjArray);
          
      });
     });
 
 },700);
 
 setTimeout(function(){
         console.log("Cloned Obj",clonedObjArray);
         res.json(clonedObjArray);
     },800);
 
 }
       
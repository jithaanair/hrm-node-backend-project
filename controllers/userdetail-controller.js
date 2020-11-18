const Task = require('../model/Task');
var Userdetail = require('../model/Userdetail');

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

exports.getUsers = function(req,res) {
    console.log("inside getusers");
    Userdetail.find()
   // .populate({'path':'creator'})
   // .populate({'path':'assignee'})
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

exports.getMemberId = function(req,res) {
    
    console.log(req.params.id);
    Userdetail.findById(req.params.id)
    .populate({'path':'jobid','select':'jname'})
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
    var clonedObjArray=[];
    console.log("Inside Members");
    var user = req.user.id;
    Userdetail.findById(user)
    .select('mid')
    .exec((err,mid)=>{
        modid=mid.mid;
        Userdetail.find({mid:modid})
        .select('PID fname lname -_id')
        .populate({path:'jobid',
                   select:'jdesc -_id'})
        .exec((err,members)=>{
            if(err) {
                console.log(err);
                res.status(400).json(err);
            }
            
            var resultPosts = members.map(function(mem) {
                var tmpPost = mem.toObject();
            
                // Add properties...
                tmpPost.progress = 0;
                tmpPost.pending = 0;
                tmpPost.completed = 0;
                return tmpPost;
              });
            
        
            
            clonedObjArray = [...resultPosts];
            console.log("cloe",clonedObjArray);
          
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
     
                     
            })
        });
        setTimeout(function(){
            console.log("Cloned Obj",clonedObjArray);
            res.json(clonedObjArray);
        },400);

    });
  
}
// { PID: { $ne: req.user.id } }
// find({assignee:members.PID})
// Task
//             .aggregate(
//         [
//             {
//                $match:{
//                    status:{
//                       $eq:'Pending'
//                     }
//                 }
//             },
//             {
//                 $count:"pending"
//             }
//     ])


 // members.progress="";
            // members.pending="";
            // members.completed="";
            // let clonedWidget = Object.assign({}, members);
            // console.log("cloned",clonedWidget);

//   members.forEach(function(element) {
        //         tmpPost = element.toObject();
        //         tmpPost.progress = 1;
        //         console.log("tmppost",tmpPost);
        //         //element.progress="";
        //     });
            // Object.defineProperty(members, 'progress', {
            //     value:0,
            //     writable: false
            //   });

 // Object.defineProperty(clonedObjArray[taskslist], 'progress', {
                //     value: progress,
                //     writable: true
                //   });
                //console.log(prgcount);
                //taskslist.progress=progress1;

  // clonedObjArray.map(obj=> ({ ...members, pending: 'false' }))
            
            //clonedObjArray.progress="";
            // clonedObjArray.forEach(function (element) {
            //     Task.find({assignee:element.PID,status:"In Progress"})
            //         .countDocuments()
            //         .exec((err,prgcount)=>{
            //             if(err)
            //             {
            //                 console.log(err);
            //             }
            //      clonedObjArray["progress"]=prgcount;
            //     // member1=Object.assign(clonedObjArray,{progress:prgcount});
            //     console.log(clonedObjArray);
            // });
            //    // console.log(clonedObjArray);
            //   });
            // Object.defineProperty(clonedObjArray, 'progress', {
            //     writable: true
            //   });
            //   console.log("he",clonedObjArray);
// clonedObjArray[taskslist]["progress"]=progress1;
                 //Object.assign({},clonedObjArray[taskslist],{progress:progress1});
            
 //clonedObjArray.progress="";
 
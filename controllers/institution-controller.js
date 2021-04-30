var Institution = require('../model/Institution');

exports.getInstitution = function(req,res) {
    Institution.find({})
    .exec((err,institution)=> {
        if(err) {
            //console.log(err);
            return res.status(400).json(err);
        }
       console.log("inside institutes",institution);
        res.json(institution);
    });  
  
}

// exports.getTaskInstitution = function(req,res) {
//     var user = req.user.id;
//     Institution.find({$and:[{task:req.params.taskid,assignee:user}]})
//     .exec((err,institutions) =>{
//         if(err) {
//             return res.status(400).json(err);
//         }
//         res.json(institutions);
//     })
// }

exports.deleteInstitution = function(req,res) {
    //  console.log(req.params.id);
      Institution.findOneAndDelete({_id:req.params.id}, function (err, docs) { 
          if (err){ 
              return res.status(400).json(err);
          } 
          else{ 
              console.log("Deleted Institution : ", docs);
              res.json(docs); 
          } 
      }); 
  }

  exports.editInstitution = function(req,res) {
      console.log("In edit institution",req.params.id);
      console.log(req.body);
    Institution.findOneAndUpdate({_id:req.params.id},req.body,{new:false})
     .exec((err,institution) =>{
         if(err) {
             return res.status(400).json(err);
         }
         console.log("Edited Institution :",institution);
         res.json(institution);
     });
 };

 exports.addInstitution =async function(req,res) {

       var newInstitution = Institution(req.body); 
       console.log("New Institution",newInstitution);
       newInstitution.save((err,institution)=> {
           if(err) {
               return res.status(400).json(err);
           }
           res.status(201).json(institution);
       });
       
};
   
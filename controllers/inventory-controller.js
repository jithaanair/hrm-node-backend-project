var Inventory = require('../model/Inventory');

exports.getInventory = function(req,res) {
    var user= req.user.id;
    Inventory.find({assignee:user})
    .exec((err,inventory)=> {
        if(err) {
            //console.log(err);
            return res.status(400).json(err);
        }
       res.json(inventory);
    });  
  
}

exports.deleteInventory = function(req,res) {
    //  console.log(req.params.id);
      Inventory.findOneAndDelete({_id:req.params.id}, function (err, docs) { 
          if (err){ 
              return res.status(400).json(err);
          } 
          else{ 
              console.log("Deleted Inventory : ", docs);
              res.json(docs); 
          } 
      }); 
  }

  exports.editInventory = function(req,res) {
      console.log("In edit inven",req.params.id);
      console.log(req.body);
    Inventory.findOneAndUpdate({_id:req.params.id},req.body,{new:false})
     .exec((err,invents) =>{
         if(err) {
             return res.status(400).json(err);
         }
         console.log("Edited Inventory :",invents);
         res.json(invents);
     });
 };

 exports.addInventory =async function(req,res) {

       var newInventory = Inventory(req.body); 
       console.log("New Inventory",newInventory);
       newInventory.save((err,task)=> {
           if(err) {
               return res.status(400).json(err);
           }
           res.status(201).json(task);
       });
       
};
   
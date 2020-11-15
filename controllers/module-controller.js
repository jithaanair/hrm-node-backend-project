var Module = require('../model/Module');

exports.getModules = function(req,res) {
    //console.log("inside getusers");
    Module.find()
    .exec((err,modules)=> {
        if(err) {
            //console.log(err);
            return res.status(400).json(err);
        }
        //console.log(modules);
       res.json(modules);
    });  
  
}


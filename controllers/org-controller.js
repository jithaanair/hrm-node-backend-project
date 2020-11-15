var Org = require('../model/Orgchart');

exports.getChart = function(req,res) {
   // console.log("inside getOrg");
    Org.find()
    .exec((err,org)=> {
        if(err) {
            //console.log(err);
            return res.status(400).json(err);
        }
        //console.log(org);
       res.json(org);
    });  
  
}
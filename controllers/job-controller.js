var Job = require('../model/Job');

exports.getJobs = function(req,res) {
    //console.log("inside getJobs");
    Job.find()
    .exec((err,jobs)=> {
        if(err) {
            console.log(err);
            return res.status(400).json(err);
        }
        //console.log(jobs);
       res.json(jobs);
    });  
  
}

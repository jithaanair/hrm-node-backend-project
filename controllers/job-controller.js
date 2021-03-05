var Job = require('../model/Job');
exports.jobArray=[];
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
exports.findJob = function(jobname) {
    Job.find({jname:jobname})
    .select('_id')
    .exec((err,jobs) => {
        if(err){
            console.log(err);
            return res.status(400).json(err);
        }
        console.log(jobs[0]._id);
        this.jobArray.push(jobs[0]._id);
        return jobs;
    });
}

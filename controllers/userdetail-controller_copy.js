const Task = require('../model/Task');
var Userdetail = require('../model/Userdetail');
var OrgCtrl = require('./orgfromto-controller');
var jobCtrl = require('./job-controller');
var Orgfromto = require('../model/Orgfromto');

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

exports.getAllUsers = function (req, res) {
    console.log("here");
    Userdetail.find()
        .populate({ 'path': 'jobid mid', 'select': 'jdesc mname' })
        .exec((err, users) => {
            if (err) {
                console.log(err);
                return res.status(400).json(err);
            }
            console.log(users);
            res.json(users);
        });
}

exports.getUsers = function (req, res) {
    var userrole;
    console.log("inside getusers");
    Userdetail.findById(req.user.id).select('role -_id')
        .exec((err, role) => {
            console.log(role);
            if (role.role != "User") {
                if (role.role == "Admin") {
                    userrole = "User";
                }

                // .populate({'path':'creator'})
                // .populate({'path':'assignee'})
                Userdetail.find({ role: userrole })
                    .select('PID fname lname -_id')
                    .exec((err, users) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).json(err);
                        }
                        console.log(users);
                        res.json(users);
                    });
            }
            else {
                console.log("inside return");
                return;
            }
        });
}

exports.getMemberId = function (req, res) {

    console.log(req.params.id);
    Userdetail.findById(req.params.id)
        .populate({ 'path': 'jobid', 'select': 'jdesc' })
        .exec((err, members) => {
            if (err) {
                console.log(err);
                return res.status(400).json(err);
            }
            console.log(members);
            return res.json(members);
        });
}

exports.getMembers = function (req, res) {
    var clonedObjArray = new Array();
    var orgmembers = new Array();
    var members = [];
    let fromdata;
    let activities = new Array();

    var i, j = 0;
    var tempString = '';
    var user = req.user.id;
    Userdetail.findById(user)
        .select('jobid')
        .populate({ path: 'jobid', select: 'jname -_id' })
        .exec((err, jid) => {
            jobid = jid.jobid.jname;
            console.log(jobid);





            Orgfromto.find()
            .select('title -_id')
            .exec((err, org) => {
                if (err) {
                    //console.log(err);
                    return res.status(400).json(err);
                }
    
    
                for (i = 0; i < org[0].title.length; i++) {
                    if (org[0].title[i] == ']') {
                        for (j; j <= i; j++) {
                            tempString = tempString + org[0].title[j];
                        }
                        j = i + 2;
                        var [a, b] = tempString.split(',');
                        a = a.replace(/[['"]+/g, '');
                        b = b.replace(/]+/g, '');
                        //a=a.replace(/['"]+/g, '');
                        b = b.replace(/['"]+/g, '');
                        a = a.trim();
                        b = b.trim();
                        console.log("a", a);
                        console.log("b", b);
                        activities.push([a, b]);
                        tempString = '';
    
                    }
                }
                // console.log("==================activites120");
                // console.log(activities);
                // console.log("activites end");
                //activities=[['MD', 'FD'],['MD', 'DOE'],['DOE', 'PM'],['DOE', 'HRM'],['PM', 'BA'],['PM', 'Eng'],['Eng','Product']];
                // indexOf2d(activities, job);
                orgmembers = OrgCtrl.getHMembers(activities, jobid)
                findeachjob(orgmembers);
                console.log("==================jobs");
                console.log(orgmembers);
                console.log("jobs end");
            });








// orgmembers = OrgCtrl.getHMembers(jobid)
            console.log("Orgmembers", orgmembers);

            // getorgmember();
        });

    // setTimeout(function () {
        function findeachjob(orgmembers){

        console.log("imhere");
        console.log("length " + Object.entries(orgmembers).length);

        console.log("length", orgmembers);
        if (orgmembers == '') {
            return res.json('');
        }
        // var i=Object.entries(orgmembers).length;
        var count=Object.entries(orgmembers).length;
        orgmembers.forEach(function (orgmember) {
            // console.log(orgmember);
            count=count-1;
                        console.log("count is"+count);

            jobCtrl.findJob(orgmember);
            if(count<1)
            arrayofjobs();
        });
    }
    // }, 300);


    function arrayofjobs(){

    setTimeout(function () {
        console.log("this is an array");
        console.log(jobCtrl.jobArray);


        Userdetail.find({ jobid: jobCtrl.jobArray })
            .select('PID fname lname avatar -_id')
            .populate({ path: 'jobid', select: 'jdesc -_id' })
            .exec((err, members) => {
                if (err) {
                    console.log(err);
                    res.status(400).json(err);
                }
                //members.push(memb);
                // console.log("Members", members);
                var resultPosts = members.map(function (mem) {
                    // console.log(mem);
                    var tmppost = mem.toObject();
                    tmppost.progress = 0;
                    tmppost.pending = 0;
                    tmppost.completed = 0;
                    return tmppost;
                });
                clonedObjArray = [...resultPosts];
                finalfunction();
            });

    }, 300);
}
function finalfunction(){
    // setTimeout(function () {

        var count2=Object.entries(clonedObjArray).length;

        console.log("cloe",clonedObjArray);
        
        clonedObjArray.forEach((err, taskslist) => {
            count2=count2-1;
                        console.log("2count is"+count2);
            Task.find({ assignee: clonedObjArray[taskslist].PID, status: "In Progress" })
                .countDocuments()
                .exec((err, progress1) => {

                    clonedObjArray[taskslist].progress = progress1;
                    // console.log(taskslist, clonedObjArray[taskslist]);
                    // console.log(clonedObjArray);
                    //return res.json(clonedObjArray);
                });
            Task.find({ assignee: clonedObjArray[taskslist].PID, status: "Completed" })
                .countDocuments()
                .exec((err, progress2) => {

                    clonedObjArray[taskslist].completed = progress2;
                    // console.log(taskslist, clonedObjArray[taskslist]);
                    // console.log(clonedObjArray);

                });
            Task.find({ assignee: clonedObjArray[taskslist].PID, status: "Pending" })
                .countDocuments()
                .exec((err, progress3) => {

                    clonedObjArray[taskslist].pending = progress3;
                    // console.log(taskslist, clonedObjArray[taskslist]);
                    // console.log(clonedObjArray);

                });

                if(count2<1)
                showtasks();
        });
        
    // }, 700);
}
function showtasks(){
    setTimeout(function () {
        // console.log("Cloned Obj", clonedObjArray);
        res.json(clonedObjArray);
    }, 3800);
}
}


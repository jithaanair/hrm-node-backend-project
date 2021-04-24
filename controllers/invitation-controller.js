var User = require('../model/User');
var Userdet = require('../model/Userdetail');
var Schedule = require('../model/Schedule');
var emailCtrl = require('./email-controller');
var Invitation = require('../model/invitation');

//Promise = require('promise');
exports.inviteUser =  function (req,res) {
    
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

var users = [];
users = req.body.uids;
console.log("inside invite users",users);
var emails = [];
var invites = [];

    users.map( (uid,index) => {
            let newInvitation = Invitation();
            newInvitation.from = req.user.id;
            newInvitation.board = req.params.boardId;
            newInvitation.to = uid;
            newInvitation.save((err, invitation) => {
                if (err) {
                    return res.status(400).json(err);
                }
                 Invitation.findById(invitation._id)
                    .populate([{ 'path': 'board', 'select': 'title desc' }])
                    .populate([{ 'path': 'to', 'select': 'fname lname' }])
                    .exec((err, invitation) => {
                        if (err) {
                            return res.status(400).json(err);
                        }
                        invites.push(invitation);
                        User.findById(invitation.to._id, (err, userdet) => {
                            if (err) {
                                return res.status(400).json(err);
                            }
                            emails.push(userdet.email);
                            console.log("users length",users.length,index);
                            if(index+1==users.length){
                            //console.log(emails);
                             //console.log(invites);
                             emailCtrl.sendInvitationEmail(emails,invites);
                             return res.status(200).json(invites);
                            }
                            
                            //emailCtrl.sendInvitationEmail(userdet,invitation);
                           
                            //res.json(invitation);
                            //sleep(30000);
                        });
                    });
                   
                });
        }); 
}
    
// (async () => {
//     try {
//       console.log('1: Before invite');
//       const x = await getInvites();
//       console.log(x);
//       console.log('3: After invite',emails);
//     } catch (err) {
//       console.log('ERROR 💥');
//     }
//   })();

    // User.find({ email:req.body.email}, (err,user) => {
    //  if(err || !user ){
    //      return res.status(400).json(err);
    //  }




//ThenPromise.all(promises).then(res=>console.log(email));
//  setTimeout(()=>
//  ThenPromise.all(promises).then(resu=>{
//     res.json(resu);
//     console.log(resu)})
//  ,200);
//setTimeout(()=>results1.then(data=>console.log(data)),300);
//  console.log("results",results);
// emailCtrl.sendInvitationEmail(usersemail,invites);


exports.getMyInvitations = function (req,res) {
        Invitation.find({to:req.user.id})
        .populate([{ 'path': 'board','select': 'title desc'}])
        .populate([{ 'path': 'from', 'select':'fname lname'}])
        .exec((err,invitations) => {
            if(err) {
                return res.status(400).json(err);
            }
         res.json(invitations);
        });
}

exports.answerInvitation = function (req,res) {
    let accepted = req.params.accept;
    Invitation.findByIdAndRemove(req.params.id,(err,invitation) => {
        if(accepted == 1) {
      Schedule.findByIdAndUpdate(invitation.board,
        { $addToSet: {users: req.user.id }},{new:true},(err,board) =>{
         if(err){
             return res.status(400).json(err);
         }
         console.log(board);
         return res.json(board);
    });
        } else {
            res.json(null);
        }
        if(err){
            return res.status(400).json({msg:"The message could not be updated"});
        }
    });
}
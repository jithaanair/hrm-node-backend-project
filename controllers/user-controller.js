
var UserModel = require('../model/User');
var jwt = require('jsonwebtoken');
var config = require('../config');
var emailCtrl = require('./email-controller');
var bcrypt = require('bcrypt-nodejs');
const User = require('../model/User');
const Userdet = require('../model/Userdetail');

function createToken(user,role) {
   return jwt.sign({id:user.id,role:role.role}, config.jwtSecret);
}

function randomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

exports.addUser = function (req, res)  {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({"msg":"Please set the required fields"});
  }
  var newUser = UserModel(req.body);
  
  //var newdet= Userdet(req.body);
 // newdet.fname=req.body.fname;
  //newdet.lname=req.body.lname;
  console.log(newUser);

  newUser.save((error,data) => {
    if(data){
      var newdet = {
        _id : data.id,
        PID : data.id,
        fname: req.body.fname,
        lname: req.body.lname,
      }
      var newins=Userdet(newdet);
      newins.save((error,data)=>{
        if(data){
          console.log('userdet',data)
        }
        else{
          console.log(error);
        }
      }) 
   }
    if (error) {
          return res.status(400).json(error);
  } 
      emailCtrl.sendWelcomeMail(newUser);
      return res.status(201).json(data);
      
  });


};

exports.loginUser = function(req, res) {
  if (!req.body.email ) {
    return res.status(400).send({"msg":"You must set the email and password of the user!"});
  }
  if(!req.body.password) {
    return res.status(400).send({"msg": "You must send the password!"});
  }
    
    UserModel.findOne({email:req.body.email}, function(error,user){
      if(error) {
        console.log(user);
        return res.status(400).json(error);
      }

      if(!user){
        return res.status(400).json({msg:"The user was not found"});
      }

      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          Userdet.findById(user.id)
          .select('role -_id')
          .exec((err,role)=>{
            console.log(role);
         return res.status(200).json({token: createToken(user,role)});
          });
        }else{
          return res.status(400).json({msg:"The email or password is incorrect"});
        }
      });
    });
  }

exports.getUser = function (req, res) {
  User.findById(req.user.id,function(err,user) {
    if (err) {
      return res.status(400).json(err);
    }
     res.json(user);
  });
}

exports.resetUserPw = function (req,res) {
  if (!req.body.email) {
    return res.status(400).send({"msg":"You must send the email!"});
  }

  let email = req.body.email;
  User.findOne({email:email}, function(err,user) {
    if (err) {
      return res.status(400).json(err);
    }
    if(!user) {
     return res.status(400).json({msg: "The user was not found"});
    }

bcrypt.genSalt(10, function(err, salt){
  if (err) return res.status(400).json(err);

  let randomPw = randomString(10);

  bcrypt.hash(randomPw, salt, null,function(err,hash) {
    if(err) return res.status(400).json(err);

    User.findByIdAndUpdate(user.id, {password: hash},function(err,user){
       if (err) {
         return res.status(400).json(err);
       }
       emailCtrl.sendResetPasswordEmail(user, randomPw);
       return res.status(200).send({msg:"Check your Emails for a new password now!"});
    });
  });
});
});
}

exports.updateUser = function(req, res) {
  User.findById(req.user.id, (err,user) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!user) {
       return res.status(400).json({msg:"The user was not found"});
    }
    if(req.body.old_password && req.body.new_password) {
      user.comparePassword(req.body.old_password,function (err, isMatch){
        if(isMatch && !err) {
         return res.status(200).json({token:createToken(user)});
        } else {
          res.status(400).json({msg:
          "The email or password is incorrect"});
        }
      });
       bcrypt.hash(req.body.new_password, salt, null, function(err,hash){
         if (err) return res.status(400).json(err);

         let updateUser = req.body;
         updateUser.password = hash;

       User.findByIdAndUpdate(user.id,updateUser,{new:true}, function(err,user){
         if (err) {
           return res.status(400).json(err);
         }
         emailCtrl.sendResetPasswordEmail(user,randomPw);
         return res.status(200).send({msg:"Check your Emails for a new password now!"});
       });
       });
    } else {
      User.findByIdAndUpdate(user.id, req.body, {new:true},(err,user) =>{
        if (err) {
         return res.status(400).json(err);
        }
        res.status(200).json(user);
      });
    }
  });

}


exports.deleteUser = function (req, res) {
  UserModel.findByIdAndRemove(req.user.id, (error, user) => {
    if (error) {
      return res.status(400).json(error);
    } else 
      return res.status(200).json(user);
  });
};
// exports.getUsers = function (req, res) {
//   UserModel.find((error, data) => {
//     if (error) {
//       res.status(400).json(error);
//     } 
//       res.json(data)
    
//   });
// };

// exports.singleUser = function (req, res, next) {
//   UserModel.findById(req.params.id, (error, data) => {
//     if (error) {
//       res.status(400).json(error);
//     } 
//       res.json(data)
//   });
// };


// exports.updateUser = function (req, res) {
//    if (!req.body.name || req.body.desc) {
//      return res.status(400).send({"msg": "You must set the name and the description of the board!"});
//    }
//    UserModel.findByIdAndUpdate(req.params.id, req.body, (error,data) => {
//     if (error) {
//        res.status(400).json(error);
//     } else {
//       res.json(data)
//       console.log('User successfully updated!')
//     }
//   });
// };



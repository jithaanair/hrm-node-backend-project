const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var  userSchema = new mongoose.Schema({

  email: {
    type: String,
    unique:true,
    required:true,
    lowercase:true
  },
  password: {
    type: String,
    required:true,
  },
  logindatetime:{
    type:Date,
  },
  lastlogoffdatetime:{
   type:Date,
  },
  loggedinornot:{
    type:String,
  }
});

userSchema.pre('save',function(next) {
  var user = this;
 
  if(!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10,function(error,salt) {
    if (error) return next(error);

  bcrypt.hash(user.password, salt, null, function(error,hash) {
          if (error) return next(error);
          user.password = hash;
          next();
    });
  });

});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password,function(err, isMatch){
      if (err) return cb(err);
      cb(null, isMatch);
  });
}


module.exports = mongoose.model('User', userSchema);
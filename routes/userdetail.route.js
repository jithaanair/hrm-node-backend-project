var express = require('express');
var passport = require('passport');
var userdetCtrl = require('../controllers/userdetail-controller');
var router = express.Router();


router.get('/allusers',userdetCtrl.getAllUsers);
router.get('/',passport.authenticate('jwt',{session:false}),userdetCtrl.getUsers);
//router.post('/userdetail',userdetCtrl.addUser);
//router.get('/',userdetCtrl.getUsers);
router.get('/members',userdetCtrl.getMembers);
router.get('/members/:id',userdetCtrl.getMemberId);
// router.post('/login',userdetCtrl.loginUser);
// router.post('/reset',userdetCtrl.resetUserPw);

// router.get('/',passport.authenticate('jwt',{session:false}),userdetCtrl.getUser)
// router.put('/',passport.authenticate('jwt',{ session: false}),userdetCtrl.updateUser);
// router.delete('/',passport.authenticate('jwt',{session:false}),userdetCtrl.deleteUser);

module.exports = router;
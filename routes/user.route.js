const express = require('express');
const passport = require('passport');
const userCtrl = require('../controllers/user-controller');
const router = express.Router();



router.post('/',userCtrl.addUser);
router.post('/login',userCtrl.loginUser);
router.post('/reset',userCtrl.resetUserPw);

router.get('/',passport.authenticate('jwt',{session:false}),userCtrl.getUser)
router.put('/',passport.authenticate('jwt',{ session: false}),userCtrl.updateUser);
router.delete('/',passport.authenticate('jwt',{session:false}),userCtrl.deleteUser);

module.exports = router;
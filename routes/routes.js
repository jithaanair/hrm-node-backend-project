var express = require('express');
var passport = require('passport');

var router = express.Router();

router.use('/users',require('./user.route'));
router.use('/userdetail',passport.authenticate('jwt',{session:false}),require('./userdetail.route'));
router.use('/tasks',passport.authenticate('jwt',{session:false}),require('./task.route'));
router.use('/module',require('./module.route'));
router.use('/job',require('./job.route'))
router.use('/aws',passport.authenticate('jwt',{session:false}),require('./aws.routes'));
router.use('/org',require('./org.route.js'));
module.exports = router;
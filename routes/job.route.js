var express = require('express');
var passport = require('passport');
var jobCtrl = require('../controllers/job-controller');

var router = express.Router();

router.get('/',jobCtrl.getJobs);

module.exports = router;
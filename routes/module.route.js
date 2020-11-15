var express = require('express');
var passport = require('passport');
var modCtrl = require('../controllers/module-controller');

var router = express.Router();

router.get('/',modCtrl.getModules);

module.exports = router;
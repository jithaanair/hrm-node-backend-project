var express = require('express');
var orgCtrl = require('../controllers/org-controller');

var router = express.Router();

router.get('/',orgCtrl.getChart);
//router.post('/',orgCtrl.addChart);

module.exports = router;
var express = require('express');
var orgfromtoCtrl = require('../controllers/orgfromto-controller');

var router = express.Router();

router.get('/',orgfromtoCtrl.getChart);
router.patch('/',orgfromtoCtrl.updateChart);

module.exports = router;
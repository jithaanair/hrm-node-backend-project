var express = require('express');
var scheduleCtrl= require('../controllers/schedule-controller');
var router =   express.Router();

router.get('/',scheduleCtrl.getOwnEvents);
router.get('/today',scheduleCtrl.getTodaysEvents);
// router.delete('/:id',scheduleCtrl.deleteEvent);
// router.put('/:id',scheduleCtrl.updateEvent);
router.post('/',scheduleCtrl.createEvent);

module.exports = router;
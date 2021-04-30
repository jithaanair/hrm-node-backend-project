var express = require('express');
var institutionCtrl = require('../controllers/institution-controller');

var router = express.Router();

router.post('/',institutionCtrl.addInstitution);
router.get('/',institutionCtrl.getInstitution);
//router.post('/:id/:accept',invitationCtrl.answerInvitation);
router.delete('/:id',institutionCtrl.deleteInstitution);
router.put('/:id',institutionCtrl.editInstitution);
module.exports = router;
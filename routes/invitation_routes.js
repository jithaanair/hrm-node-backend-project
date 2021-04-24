var express = require('express');
var invitationCtrl = require('../controllers/invitation-controller');

var router = express.Router();

router.post('/:boardId',invitationCtrl.inviteUser);
router.get('/',invitationCtrl.getMyInvitations);
router.post('/:id/:accept',invitationCtrl.answerInvitation);

module.exports = router;
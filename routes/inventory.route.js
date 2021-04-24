var express = require('express');
var inventoryCtrl = require('../controllers/inventory-controller');

var router = express.Router();

router.post('/',inventoryCtrl.addInventory);
router.get('/',inventoryCtrl.getInventory);
//router.post('/:id/:accept',invitationCtrl.answerInvitation);
router.delete('/:id',inventoryCtrl.deleteInventory);
router.put('/:id',inventoryCtrl.editInventory);
module.exports = router;
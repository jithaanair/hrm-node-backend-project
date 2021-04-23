var express = require('express');
var taskCtrl= require('../controllers/task-controller');
var router =   express.Router();

router.get('/',taskCtrl.getOwnTasks);
router.get('/member/:id',taskCtrl.getMemberTasks);
router.get('/:tid',taskCtrl.getTask);
router.post('/:id/attachments', taskCtrl.addAttachment);
router.post('/:id/attachements', taskCtrl.addAWSAttachement);
// router.get('/:id',taskCtrl.getMemTasks);
router.delete('/:id',taskCtrl.deleteTask);
router.put('/:id',taskCtrl.updateTask);
router.post('/',taskCtrl.createTask);
router.post('/:id/comments', taskCtrl.addComment);
module.exports = router;
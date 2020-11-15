var express = require('express');
var router =  express.Router();
var awsCtrl = require('../controllers/aws-controller');

router.get('/sign-s3', awsCtrl.getSignedUploadRequest);
router.get('/files', awsCtrl.getFileSignedRequest);
router.delete('/file/:name/:taskId', awsCtrl.deleteFile);

module.exports = router
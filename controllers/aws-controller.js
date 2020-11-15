var aws = require('aws-sdk');
var config = require('../config');

const SESConfig = {
    accessKeyId: 'AKIA2I4BES3626J3B3VB',
    secretAccessKey: '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',
}
aws.config.update(SESConfig);

// var s3 = new aws.S3({
//     signatureVersion: 'v4',
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: 'ap-south-1'
// });


const s3 = new aws.S3({
    signatureVersion: 'v4',
    region: 'ap-south-1'
});

exports.getSignedUploadRequest = function (req, res) {
    let fileName = req.query['file-name'];
    let fileType = req.query['file-type'];
    let taskId   = req.query['task'];
    
    
    const s3Params = {
        Bucket: config.aws_bucket,
        Key: taskId + '/' + fileName,
        Expires: 60,
        ContentType: fileType,
        ACL:'private'
    }
    s3.getSignedUrl('putObject',s3Params,(err,data)=>{
        if(err) {
            return res.status(400).json(err);
        }
    const returnData = {
        signedRequest: data,
        url:`https://${config.aws_bucket}.s3.amazonaws.com/${taskId}/${fileName}`
    };
    return res.json(returnData);
    });
};

exports.getFileSignedRequest = function (req,res) {
    console.log("In here in get file signed request");
    let taskId = req.query['task'];
    let fileName = req.query['file-name'];
    console.log(taskId);
    console.log(fileName);

    const s3Params = {
        Bucket: config.aws_bucket,
        Key : taskId + '/' + fileName,
        Expires: 60,
    };

    s3.getSignedUrl('getObject',s3Params,(err,data)=>{
        return res.json(data);
    });
};

exports.deleteFile = function (req, res) {
    let taskId = req.params.taskId;
    let fileName = req.params.name;

    const s3Params = { 
        Bucket: config.aws_bucket,
        Key: taskId + '/' + fileName
    };

    s3.deleteObject(s3Params, function (err, data) {
        if (err) {
            return res.status(400).json(err);
        }

        return res.status(200).json({ success: true });
    });
};

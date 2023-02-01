require('dotenv').config();
module.exports = {
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || '1234secret456',

   mailgun: {
    //    apiKey: process.env.MAILGUN_API_KEY || '2a349840100a13c0934839d03b5c4ab3-aff2d1b9-44194469',
       apiKey: process.env.MAILGUN_API_KEY || '58ffe0725e32c5afbf09c77020065aec-1b237f8b-3c2597a5',
       domain: process.env.MAILGUN_DOMAIN || 'sandboxdb32ffb2608f4c6fa77ff715b52076ee.mailgun.org'
   },

   aws_bucket: process.env.S3_BUCKET || 'hrmbucket',
  // mongo_db:"mongodb+srv://hrm:lUwYCCVZdVKc2DB1@hrm.h3zdx.mongodb.net/startup"  
  mongo_db:"mongodb://Localhost:27017/hrm-node"


};
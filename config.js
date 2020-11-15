module.exports = {
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || '1234secret456',

   mailgun: {
       apiKey: process.env.MAILGUN_API_KEY || '2a349840100a13c0934839d03b5c4ab3-aff2d1b9-44194469',
       domain: process.env.MAILGUN_DOMAIN || 'sandbox79247eaf597b4104a6cd19a30336015f.mailgun.org'
   },

   aws_bucket: process.env.S3_BUCKET || 'hrmbucket'

};
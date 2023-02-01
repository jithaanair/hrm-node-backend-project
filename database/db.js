var config = require('../config');
module.exports = {

    //db: 'mongodb://localhost:27017/local'
    //db: 'mongodb://116.68.73.227:27017/startup'
    db: config.mongo_db
    // db:'mongodb+srv://dbUser:dbUserPassword@cluster0.fl0oq.mongodb.net/startup'
   // mongo_db:"mongodb://127.0.0.1:27017/local"
  };
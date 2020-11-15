let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');
  helmet = require('helmet');
  winston = require('winston');
  config = require('./config');
  passport = require('passport');
  JwtStrategy = require('passport-jwt').Strategy;
  ExtractJwt =  require('passport-jwt').ExtractJwt;
  User = require('./model/User');



// Connecting mongoDB


const userRoute = require('./routes/user.route');
require('dotenv').config();

var app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;
passport.use(new JwtStrategy(opts,function(jwt_payload,done){
    User.findById(jwt_payload.id,function(err,user){
     if(err) {
       return done(err,false);
     }
     if(user){
       return done(null,user);
     }else {
       return done(null,false);
     }
  
});
}));
// RESTful API root
// app.use('/user', userRoute);
// app.use('/task', taskRoute);
app.get('/', (request, response) => {
  response.send('Hello Suni Kutta!!!!');
});
app.use(passport.initialize());
app.use(require('./routes/routes.js'));

const logger =  winston.createLogger({
    level:'info',
    transports:[
        new winston.transports.File({ filename: 'error.log' , level: 'error'}),
        new winston.transports.File({ filename: 'combined.log'})
    ]
});

if (config.env !== 'production') {
    logger.add(new winston.transports.Console({
        format:winston.format.simple()
    }));
}



// PORT
const port = process.env.PORT || 5000;


app.listen(port, function(err) {
  logger.info('PORT Connected on: ' + port);
});


mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Database connected sucessfully ')
},
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

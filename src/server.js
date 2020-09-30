const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

const app = express();

// Db connection
const { mongoose } = require('./database');

require('./config/passport')(passport);
// Settings 
app.set('port', process.env.PORT || 8000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser('dketn3dkwkKDNEkd4kDN'));
app.use(session({
  secret: 'kdl23LHe93nlkIdFeI92',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(email,password,done){
  done(err,user)
  if(email === "hola@hola.com" && password === "12345")
    console.log("llegó aqui")
    return done(null,{ id: 1, name: "Hugo" })

  done(null, false);
}));

// //Serialización
// passport.serializeUser(function(user,done){
//   done(null,user.id);
// });
// //Deserialización
// passport.deserializeUser(function(id,done){
//   done(null,{ id: 1, name: "Hugo" });
// });

// Routes
app.use('/', require('./routes/task.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

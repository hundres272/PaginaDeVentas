const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null,user.id);
    });

    passport.deserializeUser(function (id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })
    });

    //método para registrarse
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        User.findOne({'local.email': email}, function(err, user) {
            if(err) { return done(err) }
            if(user) { 
                return done(null, user, null);
            } else {
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = password;
                newUser.save(function(err){
                    if(err) {throw err;}
                    return done(null,newUser);
                });
            }
        })
    }));

    //método para login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        User.findOne({'local.email': email}, function(err, user) {
            if(err) { return done(err) }
            if(!user) { 
                return done(null, user, null);
            }
            if(!user.local.password !== password){
                return done(null,false,null);
            }
            return done(null, user);
        })
    }));
}
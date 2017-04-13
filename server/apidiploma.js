
var express = require('express');

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose         = require("mongoose");
var app = express.Router();



Diploma = require('../models/diploma');
//modification
var userModel = require("../models/user/user.model.server")();

var auth = authorized;
app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout',         logout);
app.post  ('/api/register',       register);
app.post  ('/api/user',     auth, createUser);
app.get   ('/api/loggedin',       loggedin);
app.get   ('/api/user',     auth, findAllUsers);
app.put   ('/api/user/:id', auth, updateUser);
app.delete('/api/user/:id', auth, deleteUser);

app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get   ('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

var googleConfig = {
    clientID        : '784785443875-gj0388pgm01plu09dre4huof3d2sq3cb.apps.googleusercontent.com',
    clientSecret    : 'hw4xMqDvxUyQZJ8skIR1-xg0',
    callbackURL     : 'http://localhost:5000/auth/google/callback'
};

var facebookConfig = {
    clientID        : '257940781329623',
    clientSecret    : 'c9d9a99359033547284259b8115da968',
    callbackURL     : 'http://localhost:5000/auth/facebook/callback',
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newFacebookUser = {
                        lastName:  names[1],
                        firstName: names[0],
                        email:     profile.emails[0].value,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var newGoogleUser = {
                        lastName: profile.name.familyName,
                        firstName: profile.name.givenName,
                        email: profile.emails[0].value,
                        google: {
                            id:          profile.id,
                            token:       token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials({username: username, password: password})
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function register(req, res) {
    var newUser = req.body;
    newUser.roles = ['student'];

    userModel
        .findUserByUsername(newUser.username)
        .then(
            function(user){
                if(user) {
                    res.json(null);
                } else {
                    return userModel.createUser(newUser);
                }
            },
            function(err){
                res.status(400).send(err);
            }
        )
        .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            },
            function(err){
                res.status(400).send(err);
            }
        );
}

function findAllUsers(req, res) {
    if(isAdmin(req.user)) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    } else {
        res.status(403);
    }
}

function deleteUser(req, res) {
    if(isAdmin(req.user)) {

        userModel
            .removeUser(req.params.id)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    } else {
        res.status(403);
    }
}

function updateUser(req, res) {
    var newUser = req.body;
    if(!isAdmin(req.user)) {
        delete newUser.roles;
    }
    if(typeof newUser.roles == "string") {
        newUser.roles = newUser.roles.split(",");
    }

    userModel
        .updateUser(req.params.id, newUser)
        .then(
            function(user){
                return userModel.findAllUsers();
            },
            function(err){
                res.status(400).send(err);
            }
        )
        .then(
            function(users){
                res.json(users);
            },
            function(err){
                res.status(400).send(err);
            }
        );
}

function createUser(req, res) {
    var newUser = req.body;
    if(newUser.roles && newUser.roles.length > 1) {
        newUser.roles = newUser.roles.split(",");
    } else {
        newUser.roles = ["student"];
    }            next();


    // first check if a user already exists with the username
    userModel
        .findUserByUsername(newUser.username)
        .then(
            function(user){
                // if the user does not already exist
                if(user == null) {
                    // create a new user
                    return userModel.createUser(newUser)
                        .then(
                            // fetch all the users
                            function(){
                                return userModel.findAllUsers();
                            },
                            function(err){
                                res.status(400).send(err);
                            }
                        );
                    // if the user already exists, then just fetch all the users
                } else {
                    return userModel.findAllUsers();
                }
            },
            function(err){
                res.status(400).send(err);
            }
        )
        .then(
            function(users){
                res.json(users);
            },
            function(){
                res.status(400).send(err);
            }
        )
}

function isAdmin(user) {
    if(user.roles.indexOf("admin") > 0) {
        return true
    }
    return false;
}

function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
    }
}
app.get('/api/diplomas',function (req,res) {
    Diploma.getDiplomas(function (err, diplomas) {
        if(err){
            throw err;
        }
        res.json(diplomas);
    })
});
app.get('/api/diplomas/:_id',function (req,res) {
    Diploma.getDiplomaById(req.params._id, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

app.post('/api/diplomas',function (req,res) {
    var diploma = req.body;
    Diploma.addDiploma(diploma, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});
app.put('/api/diplomas/:_id',function (req,res) {
    var id = req.params._id;
    var diploma = req.body;
    Diploma.updateDiploma(id, diploma, {}, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

app.delete('/api/diplomas/:_id',function (req,res) {
    var id = req.params._id;
    Diploma.removeDiploma(id, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});


app.get('/api/diplomas/genrebts/:genre', function(req, res) {
    Diploma.finddiplomasgenre({genre:'BTS'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
app.get('/api/diplomas/genrelicense/:genre', function(req, res) {
    Diploma.finddiplomasgenrelicense({genre:'Licenses'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
app.get('/api/diplomas/genreing/:genre', function(req, res) {
    Diploma.finddiplomasgenreing({genre:'Engineering'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
app.get('/api/diplomas/genremasters/:genre', function(req, res) {
    Diploma.finddiplomasgenremaster({genre:'Masters'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});





module.exports = app;
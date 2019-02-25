const Profile = require('../models/profile');
const User = require('../models/user')
const mongoose = require('mongoose');
const passport = require('passport');
var passportJWT = require("passport-jwt");
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
require('../config/passport')(passport);
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader();
opts.secretOrKey = 'NvpLQxw1FEXGcfbKoSOXVPy33PXzmzSz';
module.exports = function(app, db) {
  app.post('/signup', function(req, res) {
    newProfile = new Profile({
      _id: new mongoose.Types.ObjectId(),
      name: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      },
      queens: req.body.queens,
      driver: req.body.driver,
      notes: req.body.notes
    });
    newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: req.body.password,
      profile: newProfile._id,
      admin: false
    });
    newProfile.save(function(err) {
      if (err) throw err;
    });
    newUser.save(function(err) {
      if (err) throw err;
    });
    res.send("success");
  });
  app.post('/login', function(req, res) {
    if(req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
    }
    User.findOne({email: email}, function(err, user) {
      if(err) throw err;
      if(user){
        user.comparePassword(password, function(err, isMatch) {
          if(err) throw err;
          if(isMatch) {
            var payload = {id: user.id};
            var token = jwt.sign(payload, opts.secretOrKey);
            res.json({message: "ok", token: token});
          } else {
            res.status(401).json({message:"passwords did not match"});
            }
          });
      }
      });
    });
};

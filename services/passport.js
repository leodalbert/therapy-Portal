const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        // someone could make an account somewheere else with your email and then get in
        // maybe they should just be redirected to log in with google.
        $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
      }).then((existingUser) => {
        if (existingUser) {
          // record already exists
          done(null, existingUser);
        } else {
          // no record found
          new User({ googleId: profile.id, email: profile.emails[0].value })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'email', 'name'],
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        $or: [{ facebookId: profile.id }, { email: profile.emails[0].value }],
      }).then((existingUser) => {
        if (existingUser) {
          // record already exists
          done(null, existingUser);
        } else {
          // no record found
          new User({ facebookId: profile.id, email: profile.emails[0].value })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

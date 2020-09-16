const passport = require('passport');

module.exports = (app) => {
  // @route   GET /auth/google
  // @desc    Start Google Oauth flow
  // @access  Public
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  // @route   GET /auth/google/callback
  // @desc    Google Oauth redirect URI
  // @access  Public
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // @route   GET /auth/facebook
  // @desc    Start Facebook Oauth flow
  // @access  Public
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email'],
    })
  );

  // @route   GET /auth/facebook/callback
  // @desc    Facebook Oauth redirect URI
  // @access  Public
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // @route   GET /api/logout
  // @desc    Log user out
  // @access  Public
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // @route   GET /api/current_user
  // @desc    Test route to get current user
  // @access  Public

  // includes password - delete later
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

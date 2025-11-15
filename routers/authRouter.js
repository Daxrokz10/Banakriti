const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');
const isAuth = require('../middlewares/auth');
const passport = require('passport');

// Show login page
authRouter.get('/login', authCtrl.getLogin);

// Handle login form submission
authRouter.post('/login', authCtrl.postLogin);

// Show signup page
authRouter.get('/signup', authCtrl.getSignup);

// Handle signup form submission
authRouter.post('/signup', authCtrl.postSignup);

// Start Google OAuth authentication
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
authRouter.get('/google/callback', (req, res, next) => {
    if (process.env.DEBUG && process.env.DEBUG === 'true') {
      console.log('Google callback query:', req.query);
    }
    // If the callback doesn't include the authorization code, send users to start auth flow
    if (!req.query || !req.query.code) {
      return res.redirect('/auth/google');
    }
    return next();
  },
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  // On successful login, redirect to homepage
  function (req, res) {
    res.redirect('/');
  }
);

module.exports = authRouter;

const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');
const isAuth = require('../middlewares/auth');
const passport = require('passport');

authRouter.get('/login', authCtrl.getLogin);
authRouter.post('/login', authCtrl.postLogin);

authRouter.get('/signup', authCtrl.getSignup);
authRouter.post('/signup', authCtrl.postSignup);

// Redirect to Google for authentication
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
authRouter.get('/google/callback',(req, res, next) => {
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
  function (req, res) {
    // Successful login, redirect as needed
    res.redirect('/');
  }
);


module.exports = authRouter;

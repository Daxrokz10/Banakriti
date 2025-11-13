const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');
const isAuth = require('../middlewares/auth');
const passport = require('passport');

authRouter.get('/login',authCtrl.getLogin);
authRouter.post('/login',authCtrl.postLogin);

authRouter.get('/signup',authCtrl.getSignup);
authRouter.post('/signup',authCtrl.postSignup);

// Redirect to Google for authentication
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful login, redirect as needed
    res.redirect('/');
  }
);


module.exports = authRouter;

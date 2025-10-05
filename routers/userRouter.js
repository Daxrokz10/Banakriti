const express = require('express');
const userRouter = express.Router();
const userCtrl = require('../controllers/userController');
const { isAuth } = require("../middlewares/auth");
const passport = require('passport');

userRouter.get('/',passport.userAuth,userCtrl.getProfile);

module.exports = userRouter;
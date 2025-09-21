const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');

authRouter.get('/login',authCtrl.getLogin);

module.exports = authRouter;

const express = require('express');
const homeRouter = express.Router();
const homeCtrl = require('../controllers/homeController');
const { isAuth } = require("../middlewares/auth");

// Show homepage
homeRouter.get('/',homeCtrl.home);

module.exports = homeRouter;
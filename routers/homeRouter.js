const express = require('express');
const homeRouter = express.Router();
const homeCtrl = require('../controllers/homeController');

homeRouter.get('/',homeCtrl.home);

module.exports = homeRouter;
const express = require("express");
const homeRouter = express.Router();
const passport = require('passport');
const homeCtrl = require('../../controllers/admin/homeController');
const Product = require('../../models/admin/productSchema');

homeRouter.get('/',passport.userAuth,homeCtrl.getHome);
homeRouter.get('/products',passport.userAuth,homeCtrl.getProducts);

homeRouter.get('/gridView',passport.userAuth,homeCtrl.getUserPage);

module.exports = homeRouter;
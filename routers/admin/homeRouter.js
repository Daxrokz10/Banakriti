const express = require("express");
const homeRouter = express.Router();
const passport = require('passport');
const homeCtrl = require('../../controllers/admin/homeController.js');
const Product = require('../../models/productsSchema.js');


// admin panel home page
homeRouter.get('/',passport.userAuth,homeCtrl.getHome);

// admin panel view products 
homeRouter.get('/products',passport.userAuth,homeCtrl.getProducts);

homeRouter.get('/gridView',passport.userAuth,homeCtrl.getProdcutGrid);

module.exports = homeRouter;
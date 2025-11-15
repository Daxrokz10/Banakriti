const express = require('express');
const adminRouter = express.Router();
const homeRouter = require('./admin/homeRouter');
const productRouter = require('./admin/productRouter');

// leads to homerouter / for admin home and view products 
adminRouter.use('/',homeRouter);

// leads to productRouter /admin/product for admin product management
adminRouter.use('/product',productRouter); 

module.exports = adminRouter;
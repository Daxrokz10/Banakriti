const express = require('express');
const adminRouter = express.Router();
const homeRouter = require('./admin/homeRouter');
const productRouter = require('./admin/productRouter');

adminRouter.use('/',homeRouter);
adminRouter.use('/product',productRouter); 

module.exports = adminRouter;
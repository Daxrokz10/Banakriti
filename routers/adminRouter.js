const express = require('express');
const adminRouter = express.Router();
const adminCtrl = require('../controllers/adminController');

// make sure these match your controller names
adminRouter.get('/addProduct', adminCtrl.getAddProduct);
adminRouter.post('/addProduct', adminCtrl.postAddProduct);

module.exports = adminRouter;

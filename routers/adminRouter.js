const express = require('express');
const adminRouter = express.Router();
const adminCtrl = require('../controllers/adminController');
const multer = require('multer');
const upload = require('../middlewares/upload')


adminRouter.get('/addProduct', adminCtrl.getAddProduct);
adminRouter.post('/addProduct',upload.single('image'), adminCtrl.postAddProduct);

module.exports = adminRouter;

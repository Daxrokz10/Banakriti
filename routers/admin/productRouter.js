const express = require("express");
const productRouter = express.Router();
const passport = require('passport');
const productCtrl = require('../../controllers/admin/productController.js');
const Product = require('../../models/productsSchema.js');
const upload = require('../../middlewares/upload');

productRouter.get('/add',passport.userAuth,productCtrl.getAddProduct);
productRouter.post('/add', passport.userAuth, upload.single('image'), productCtrl.postAddProduct);

productRouter.get('/edit/:id',passport.userAuth,productCtrl.getEdit);
productRouter.post('/edit/:id', upload.single('image'), productCtrl.postEdit);

productRouter.get('/delete/:id',passport.userAuth,productCtrl.deleteProduct);

module.exports = productRouter;
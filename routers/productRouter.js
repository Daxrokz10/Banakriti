const express = require('express');
const productRouter = express.Router();
const productCtrl = require('../controllers/productController');
const { isAuth } = require("../middlewares/auth");

productRouter.get('/:id',isAuth,productCtrl.getProductPage);

module.exports = productRouter;
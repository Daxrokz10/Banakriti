const express = require('express');
const productRouter = express.Router();
const productCtrl = require('../controllers/productController');

productRouter.get('/:id',productCtrl.getProductPage);

module.exports = productRouter;
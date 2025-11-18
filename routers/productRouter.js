const express = require('express');
const productRouter = express.Router();
const productCtrl = require('../controllers/productController');
const { isAuth } = require("../middlewares/auth");

// Show product details page (requires authentication)
productRouter.get('/:id',isAuth,productCtrl.getProductPage);


module.exports = productRouter;
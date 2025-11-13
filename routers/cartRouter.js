const express = require('express');
const cartRouter = express.Router();
const cartCtrl = require('../controllers/cartController');
const { isAuth } = require("../middlewares/auth");


cartRouter.get('/',cartCtrl.getCart);

cartRouter.post('/add/:productId',cartCtrl.addToCart);

cartRouter.post("/remove/:productId", cartCtrl.removeCartItem);

cartRouter.post("/cartIncrement/:productId", cartCtrl.cartIncrement);
cartRouter.post("/cartDecrement/:productId", cartCtrl.cartDecrement);

cartRouter.get('/checkout',isAuth,cartCtrl.getCheckoutPage);

module.exports = cartRouter;
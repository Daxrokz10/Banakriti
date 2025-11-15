const express = require('express');
const cartRouter = express.Router();
const cartCtrl = require('../controllers/cartController');
const { isAuth } = require("../middlewares/auth");

// Show user's cart page
cartRouter.get('/',cartCtrl.getCart);

// Add a product to cart
cartRouter.post('/add/:productId',cartCtrl.addToCart);

// Remove a product from cart
cartRouter.post("/remove/:productId", cartCtrl.removeCartItem);

// Increase quantity of a cart item
cartRouter.post("/cartIncrement/:productId", cartCtrl.cartIncrement);

// Decrease quantity of a cart item
cartRouter.post("/cartDecrement/:productId", cartCtrl.cartDecrement);

// Show checkout page (requires authentication)
cartRouter.get('/checkout',isAuth,cartCtrl.getCheckoutPage);

module.exports = cartRouter;
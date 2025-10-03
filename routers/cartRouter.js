const express = require('express');
const cartRouter = express.Router();
const cartCtrl = require('../controllers/cartController');
const { isAuth } = require("../middlewares/auth");


cartRouter.get('/',cartCtrl.getCart);

cartRouter.post('/add/:productId',cartCtrl.addToCart);

// Update quantity
// router.post("/update/:productId", cartController.updateCart);

// Remove product
cartRouter.post("/remove/:productId", cartCtrl.removeCartItem);

module.exports = cartRouter;
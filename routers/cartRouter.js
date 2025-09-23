const express = require('express');
const cartRouter = express.Router();
const cartCtrl = require('../controllers/cartController');
const { isAuth } = require("../middlewares/auth");


cartRouter.get('/',cartCtrl.getCart);

module.exports = cartRouter;
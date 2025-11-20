const Cart = require('../models/cartSchema');

module.exports.showCart = async function(req, res, next) {
  if (req.isAuthenticated()) {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.locals.headerCart = cart || { items: [] };
  } else {
    res.locals.headerCart = { items: [] };
  }
  next();
};


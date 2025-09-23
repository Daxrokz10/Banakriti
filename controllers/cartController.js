const Cart = require('../models/cartSchema');

module.exports.getCart = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login"); // send guest to login
  } else {
    try {
      let cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product"
      );
      if (!cart) {
        cart = { items: [] }; // fallback empty cart
      }
      res.render("./pages/cart", { cart });
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  }
};

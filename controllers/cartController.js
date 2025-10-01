const Cart = require("../models/cartSchema");

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

module.exports.addToCart = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  } else {
    const productId = req.params.productId;
    const qty = parseInt(req.body.quantity) || 1;

    try {
      let cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }

      const existing = cart.items.find(
        (i) => i.product.toString() === productId
      );
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.items.push({ product: productId, quantity: qty });
      }

      await cart.save();
      res.redirect("/cart");
    } catch (err) {
      console.error(err);
      res.redirect("/product");
    }
  }
};

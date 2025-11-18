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
      res.render("./client/pages/cart", { cart });
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
    const size = req.body.size;
    const color = req.body.color;

    try {
      let cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }

      // Find item with same product, size, and color
      const existing = cart.items.find(
        (i) =>
          i.product.toString() === productId &&
          i.size === size &&
          i.color === color
      );
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.items.push({ product: productId, quantity: qty, size, color });
      }

      await cart.save();
      res.redirect("/cart");
    } catch (err) {
      console.error(err);
      res.redirect("/product");
    }
  }
};

module.exports.cartIncrement = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  const productId = req.params.productId;
  try {
    await Cart.updateOne(
      { user: req.user._id, "items.product": productId },
      { $inc: { "items.$.quantity": 1 } }
    );
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
    res.redirect('/cart');
  }
}

module.exports.cartDecrement = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  const productId = req.params.productId;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    const item = cart.items.find(i => i.product.toString() === productId);
    if (item && item.quantity > 1) {
      await Cart.updateOne(
        { user: req.user._id, "items.product": productId },
        { $inc: { "items.$.quantity": -1 } }
      );
    }
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
    res.redirect('/cart');
  }
}

module.exports.removeCartItem = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  const productId = req.params.productId;
  try {
    await Cart.updateOne(
      { user: req.user._id },
      { $pull: { items: { product: productId } } }
    );
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
    res.redirect('/cart');
  }
};

module.exports.getCheckoutPage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.render('./client/checkout.ejs', { cart });
  } catch (error) {
    console.error(error);
    res.redirect('/cart');
  }
};
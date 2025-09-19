const Product = require("../models/productsSchema");

module.exports.getAddProduct = (req, res) => {
  return res.render("pages/admin/addProduct");
};

module.exports.postAddProduct = async (req, res) => {
  try {
    const { name, price, description, category, image, stock } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
    });
    if (req.file) {
      newProduct.image = req.file.path; 
    }
    await newProduct.save();
    return res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error.message);
  }
};

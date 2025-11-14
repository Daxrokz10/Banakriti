const Product = require("../../models/productsSchema");

module.exports.getAddProduct = (req,res)=>{
    return res.render('./pages/product/addProduct');
}
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

module.exports.getEdit = async (req, res) => {
  try {
    console.log(`Request Params:`, req.params); // Debugging log
    const { id } = req.params;

    if (!id) {
      console.error(`Product ID is missing in the request.`);
      return res.status(400).send("Bad Request: Product ID is required");
    }

    const product = await Product.findById(id);

    if (!product) {
      console.error(`Product with ID ${id} not found.`);
      return res.status(404).send("Product not found");
    }

    return res.render('./pages/product/editProduct', { product });
  } catch (error) {
    console.error(`Error fetching product: ${error.message}`);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.postEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, stock } = req.body;
    const updatedData = { name, price, description, category, stock };

    if (req.file) {
      updatedData.image = req.file.path; 
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      console.error(`Product with ID ${id} not found for update.`);
      return res.status(404).send("Product not found");
    }

    return res.redirect('/products');
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.deleteProduct = async(req,res)=>{
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  return res.redirect(req.get("Referrer") || "/");
}
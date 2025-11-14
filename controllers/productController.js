const bcrypt = require('bcrypt');
const Product = require('../models/productsSchema');

module.exports.getProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.render('./client/pages/product.ejs', { product });
    } catch (error) {
        console.log(error.message);
    }
}

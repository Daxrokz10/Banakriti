const bcrypt = require('bcrypt');
const Product = require('../models/productsSchema');

module.exports.getProductPage = async (req,res)=>{
    const product = await Product.findById(req.params.id);
    return res.render('./pages/product.ejs',{product});
}

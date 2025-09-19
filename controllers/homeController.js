const bcrypt = require('bcrypt');
const Product = require('../models/productsSchema');

module.exports.home = async (req,res)=>{
    const products = await Product.find({});
    return res.render('index',{products});
}
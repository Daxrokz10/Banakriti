const bcrypt = require('bcrypt');
const Product = require('../models/productsSchema');
const categories = ['Keychain' , 'Wallart' , 'Games' , 'Miscellaneous'];
const Countdown = require('../models/countdownSchema');

module.exports.home = async (req,res)=>{
    const selectedCategory = req.query.category || 'all';

    let query = {};

    if(selectedCategory !== 'all' && categories.includes(selectedCategory)){
        query.category = selectedCategory;
    }

    const products = await Product.find(query);
    const countdown = await Countdown.findOne({});
    return res.render('./client/index',{products , categories , selectedCategory, countdown});
}
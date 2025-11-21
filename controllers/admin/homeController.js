const Product = require('../../models/productsSchema');

module.exports.getHome = (req,res)=>{
    return res.render('./admin/index', { title: "Dashboard", page: "dashboard" });
}

module.exports.getProducts = async (req,res)=>{
    const products = await Product.find({});
    console.log(products);
    return res.render('./admin/pages/product/list',{products});
}

module.exports.getProdcutGrid = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.render('./admin/pages/userPage', { products });
    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports.getCountdown = (req, res) => {
    return res.render('./admin/pages/countdown');
}

module.exports.setCountdown = async (req, res) => {
    // Logic to remove old countdown 
    await Countdown.deleteMany({});

    // Logic to set a new countdown timer
    const { title, targetDate } = req.body;
    const newCountdown = new Countdown({ title, targetDate });
    await newCountdown.save();
    return res.redirect('/admin/countdown');

}
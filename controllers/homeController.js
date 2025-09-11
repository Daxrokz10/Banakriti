const bcrypt = require('bcrypt');

module.exports.home = (req,res)=>{
    return res.render('index');
}
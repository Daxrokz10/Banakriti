const User = require('../models/userSchema');

module.exports.getProfile = (req, res) => {
    const user = req.user; // Authenticated user
    const session = req.session; // Session data
    return res.render('./pages/profile', { user, session });
};
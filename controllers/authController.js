const passport = require("passport");
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

module.exports.getLogin = (req, res) => {
  return res.render("./pages/auth/login");
};
module.exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // pass info.message to query string or flash
      return res.redirect("/auth/login?error=" + encodeURIComponent(info?.message || "Invalid credentials"));
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      // ✅ If you want email verification later:
      // if (!user.verifiedStatus) {
      //   req.flash("error", "Email not verified!");
      //   return res.redirect("/auth/login");
      // }

      return res.redirect("/");
    });
  })(req, res, next);
};

module.exports.getSignup = (req, res) => {
  return res.render("./pages/auth/signup");
};
module.exports.postSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.redirect("/?signupError=1");
    }
    const hashed = await bcrypt.hash(password,10);
    await User.create({
      username: username,
      email: email,
      password: hashed
    //   verifiedStatus: true,
    });
    return res.redirect("/auth/login");
    // req.session.userData = { username, email, password, role };
    // return res.render("./pages/auth/signup/sendOTP", { userData: req.session.userData });
  } catch (error) {
    console.log(error.message);
    return res.redirect("/auth/signup");
  }
};

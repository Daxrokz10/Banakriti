const passport = require("passport");
const User = require('../../models/userSchema');
const bcrypt = require('bcrypt');

module.exports.getLogin = (req, res) => {
  return res.render("./pages/auth/login");
};

module.exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect("/auth/login?error=" + encodeURIComponent(info?.message || "Invalid credentials"));
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
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
    // check if user exists
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.redirect("/auth/signup?error=User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    // create user
    await User.create({
      username,
      email,
      password: hashed,
      verified: true, // default true since verification removed
    });

    // redirect to login
    return res.redirect("/auth/login?success=" + encodeURIComponent("Signup successful! Please log in."));
  } catch (error) {
    console.error(error.message);
    return res.redirect("/auth/signup?error=Something went wrong");
  }
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.redirect('/auth/login');
  });
};

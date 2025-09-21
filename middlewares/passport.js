const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, { message: "No user found" });
          }

          const valid = await bcrypt.compare(password, user.password);
          if (!valid) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  passport.userAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
      res.locals.user = req.user;
      return next();
    }
    return res.redirect('/login');
  }
}


module.exports = initialize;

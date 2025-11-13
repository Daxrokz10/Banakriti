const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
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

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {

          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;
          const googleId = profile.id;

          if (!email) {
            return done(new Error("No email returned from Google"), null);
          }

          // Try to find an existing user
          let user = await User.findOne({ email });

          if (!user) {
            // If not found, create a new one
            user = new User({
              username: name,
              email: email,
              googleId: googleId,
              oauthProvider: "google",
              role: "user",
            });
            await user.save();
          } else if (!user.googleId) {
            // If user exists (like a local signup) but no googleId, link it
            user.googleId = googleId;
            user.oauthProvider = "google";
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          console.error("Error in Google Strategy:", err);
          return done(err, null);
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

  passport.userAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
      res.locals.session = req.session;
      return next();
    }
    return res.redirect('/auth/login');
  }
}


module.exports = initialize;

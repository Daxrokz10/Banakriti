exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
};

exports.allowUsers = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/auth/login');
  if (['user','admin'].includes(req.user.role)) return next();
  res.redirect('/auth/login');
};

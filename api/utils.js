function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: 'MissingUser',
      message: 'You must be longed in to perform that action',
    });
  }

  next();
}

module.exports = {
  requireUser,
};

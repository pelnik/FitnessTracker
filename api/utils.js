function requireUser(req, res, next) {
  console.log('entering reuqire user', req.user);

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

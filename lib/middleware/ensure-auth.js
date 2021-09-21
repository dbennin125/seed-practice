const UserService = require('../services/UserServices');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // try {
  //   const token = req.cookies.session;
  //   req.user = UserService.verifyAuthToken(token);
  //   next();
  // } catch (err) {
  //   err.status = 401;
  //   next(err);
  // }
  const { session } = req.cookies;
  const payload = jwt.verify(session, process.env.APP_SECRET);
  req.user = payload;
  next();
};

const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/UserServices');

const oneDay = 1000 * 60 * 60 * 24;
const makeCookie = (res, user) => {
  res.cookie('session', UserService.authToken(user), {
    httpOnly: true,
    maxAge: oneDay,
    sameStie: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService.create(req.body)
      .then((user) => {
        makeCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    UserService.authorize(req.body)
      .then((user) => {
        makeCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    try {
      res.send(req.user);
      next();
    } catch (err) {
      res.status(500);
      next(err);
    }
  });

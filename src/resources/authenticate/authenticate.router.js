const router = require('express').Router();
const { catchErrors } = require('../../middlewares/catch-errors');
const authService = require('./authenticate.service');
const { ClientError } = require('../../error-classes');
const { FORBIDDEN, BAD_REQUEST } = require('http-status-codes');

router.route('/').post(
  catchErrors(async (req, res, next) => {
    const { login, password } = req.body;
    if (!login || !password) {
      throw new ClientError(BAD_REQUEST);
    }
    const user = await authService.isUserPresentFunc({ login, password });
    if (!user) {
      throw new ClientError(FORBIDDEN);
    }
    const token = await authService.getToken(user);
    res.send({ token });
    next();
  })
);

module.exports = router;

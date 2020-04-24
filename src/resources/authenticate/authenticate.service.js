const usersService = require('../users/user.service');
const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const comparePassword = util.promisify(bcrypt.compare);

const isUserPresentFunc = async user => {
  const userFromDB = await usersService.isUserPresentFunc(user);
  if (!userFromDB) {
    return false;
  }
  const isMatchPassword = await comparePassword(
    user.password,
    userFromDB.password
  );
  return isMatchPassword ? userFromDB : false;
};

const getToken = user => {
  const userId = user._id;
  const { login } = user;
  const payload = { userId, login };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 100 });
};

module.exports = { isUserPresentFunc, getToken };

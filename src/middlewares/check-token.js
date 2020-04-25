const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const util = require('util');
const { ClientError } = require('../error-classes');
const { UNAUTHORIZED } = require('http-status-codes');

const strategyBearer = 'Bearer';
const isTokenValid = util.promisify(jwt.verify);

const checkToken = async (req, res, next) => {
  let authorizationData = req.headers.authorization;
  if (!authorizationData) {
    throw new ClientError(UNAUTHORIZED);
  }
  authorizationData = authorizationData.split(' ');
  const strategy = authorizationData[0];
  if (strategy !== strategyBearer) {
    throw new ClientError(UNAUTHORIZED);
  }
  const token = authorizationData[1];
  if (token) {
    try {
      await isTokenValid(token, JWT_SECRET_KEY);
    } catch (err) {
      throw new ClientError(UNAUTHORIZED);
    }
    next();
    return;
  }
  throw new ClientError(UNAUTHORIZED);
};

module.exports = { checkToken };

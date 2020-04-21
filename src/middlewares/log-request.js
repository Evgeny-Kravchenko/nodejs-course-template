const { logger } = require('../logger');

const logRequest = (req, res, next) => {
  const { body, query, originalUrl, method } = req;
  logger.info({
    method,
    message: JSON.stringify({ originalUrl, body, query })
  });
  next();
};

module.exports = { logRequest };

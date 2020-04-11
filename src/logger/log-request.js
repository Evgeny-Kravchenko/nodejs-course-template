const { logger } = require('../logger/index');

const logRequest = (req, res, next) => {
  const { body, query, originalUrl } = req;
  logger.info({
    level: 'info',
    message: JSON.stringify({ originalUrl, body, query })
  });
  next();
};

module.exports = { logRequest };

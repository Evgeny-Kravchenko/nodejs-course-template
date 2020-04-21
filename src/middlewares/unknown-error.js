const { logger } = require('../logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

// eslint-disable-next-line
const unknownError = (err, req, res, next) => {
  logger.error({
    status: `${INTERNAL_SERVER_ERROR}`,
    message: getStatusText(INTERNAL_SERVER_ERROR)
  });
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
};

module.exports = { unknownError };

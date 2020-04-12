const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const { logRequest } = require('./logger/log-request');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { handlerErrors } = require('./resources/handlerErrors');
const { logger } = require('./logger/index');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logRequest);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use(handlerErrors);

app.use((err, req, res) => {
  logger.error({
    status: `${INTERNAL_SERVER_ERROR}`,
    message: getStatusText(INTERNAL_SERVER_ERROR)
  });
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

module.exports = app;

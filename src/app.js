const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const { startServer } = require('./middlewares/start-server');
const { logRequest } = require('./middlewares/log-request');
const { handlerErrors } = require('./middlewares/handlerErrors');
const { unknownError } = require('./middlewares/unknown-error');
const { logger } = require('./logger/index');

process.on('uncaughtException', err => {
  logger.error({
    name: 'uncaughtException',
    message: err.message
  });
  const { exit } = process;
  logger.on('finish', () => exit(1));
});

// throw new Error('I am synchronous error and I am elusive');

process.on('unhandledRejection', err => {
  logger.error({
    name: 'unhandledRejection',
    message: err.message
  });
  const { exit } = process;
  logger.on('finish', () => exit(1));
});

// throw new Error('I am asynchronous error and I am elusive');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', startServer);

app.use(logRequest);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use(handlerErrors);

app.use(unknownError);

module.exports = app;

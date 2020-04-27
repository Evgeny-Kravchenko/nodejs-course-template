const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const authenticateRouter = require('./resources/authenticate/authenticate.router');
const { startServer } = require('./middlewares/start-server');
const { logRequest } = require('./middlewares/log-request');
const { handlerErrors } = require('./middlewares/handlerErrors');
const { unknownError } = require('./middlewares/unknown-error');
const { catchErrors } = require('./middlewares/catch-errors');
const { checkToken } = require('./middlewares/check-token');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/login', authenticateRouter);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', startServer);

app.use(logRequest);

app.use('/users', catchErrors(checkToken), userRouter);

app.use('/boards', catchErrors(checkToken), boardRouter);

app.use(handlerErrors);

app.use(unknownError);

module.exports = app;

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

// Promise.reject('I am asynchronous error and I am elusive too');

const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./db/db.client');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

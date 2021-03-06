const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const usersService = require('../resources/users/user.service');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log("We're connected");
    await db.dropDatabase(() => {
      console.log('Database dropped success');
      cb();
    });
    await usersService.createUser('BOSS', 'admin', 'admin');
  });
};

module.exports = { connectToDB };

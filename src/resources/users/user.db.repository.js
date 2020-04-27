const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getUser = async id => {
  return User.findById(id);
};

const createUser = async user => {
  return User.create(user);
};

const updateUser = async user => {
  return User.updateOne({ _id: user.id }, user);
};

const deleteUser = async id => {
  const deleteResult = await User.deleteOne({ _id: id });
  return deleteResult.deletedCount;
};

const isUserPresentFunc = async user => {
  const { login } = user;
  return User.findOne({ login });
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  isUserPresentFunc
};

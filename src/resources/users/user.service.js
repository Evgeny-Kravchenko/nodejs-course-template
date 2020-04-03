const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getUser = async id => {
  const user = await usersRepo.getUser(id);
  if (!user) {
    return {};
  }
  delete user.password;
  return user;
};

const createUser = async (name, login, password) => {
  const user = new User({ name, login, password });
  return await usersRepo.createUser(user);
};

const updateUser = async (id, name, login, password) => {
  return await usersRepo.updateUser({ id, name, login, password });
};

const deleteUser = async id => {
  const user = await usersRepo.getUser(id);
  const isDelete = await usersRepo.deleteUser(id);
  if (isDelete) {
    delete user.password;
    return user;
  }
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

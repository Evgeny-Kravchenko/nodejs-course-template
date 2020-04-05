const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getUser = id => {
  const user = usersRepo.getUser(id);
  if (!user) {
    return {};
  }
  delete user.password;
  return user;
};

const createUser = (name, login, password) => {
  const user = new User({ name, login, password });
  return usersRepo.createUser(user);
};

const updateUser = (id, name, login, password) => {
  return usersRepo.updateUser({ id, name, login, password });
};

const deleteUser = id => {
  const user = usersRepo.getUser(id);
  const isDelete = usersRepo.deleteUser(id);
  if (isDelete) {
    delete user.password;
    return user;
  }
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

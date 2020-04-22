const usersRepo = require('./user.db.repository');
const User = require('./user.model');
const tasksService = require('../tasks/tasks.service');
const bcrypt = require('bcrypt');
const util = require('util');

const hashPassword = util.promisify(bcrypt.hash);

const getAll = () => usersRepo.getAll();

const getUser = id => {
  const user = usersRepo.getUser(id);
  return user || {};
};

const createUser = async (name, login, password) => {
  const hash = await hashPassword(password, 10);
  const user = new User({ name, login, password: hash });
  return usersRepo.createUser(user);
};

const updateUser = (id, name, login, password) => {
  return usersRepo.updateUser({ id, name, login, password });
};

const deleteUser = async id => {
  const isDelete = await usersRepo.deleteUser(id);
  if (isDelete) {
    await tasksService.unassignTasks(id);
    return isDelete;
  }
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

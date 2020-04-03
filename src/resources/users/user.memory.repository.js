const users = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const getUser = async id => {
  return users.find(item => item.id === id);
};

const createUser = async user => {
  users.push(user);
  const { id, login, name } = user;
  return { id, login, name };
};

module.exports = { getAll, getUser, createUser };

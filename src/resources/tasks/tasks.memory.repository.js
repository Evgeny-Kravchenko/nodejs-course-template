const tasks = [];

const createTask = async task => {
  await tasks.push(task);
  return task;
};

const getTasksByBoardId = async boardId => {
  return tasks.filter(item => item.boardId === boardId);
};

const getTaskById = async taskId => {
  return tasks.find(item => item.id === taskId);
};

module.exports = { createTask, getTasksByBoardId, getTaskById };

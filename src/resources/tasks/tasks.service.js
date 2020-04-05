const tasksRepo = require('./tasks.memory.repository');
const Task = require('./tasks.model');

const createTask = data => {
  const task = new Task(data);
  return tasksRepo.createTask(task);
};

const getTasksByBoardId = boardId => {
  const tasks = tasksRepo.getTasksByBoardId(boardId);
  console.log(tasks);
  return tasks;
};

const getTaskById = taskId => {
  return tasksRepo.getTaskById(taskId);
};

module.exports = { createTask, getTasksByBoardId, getTaskById };

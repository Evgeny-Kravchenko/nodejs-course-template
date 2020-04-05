const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const boardId = req.params.id;
  const tasks = await tasksService.getTasksByBoardId(boardId);
  res.json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const { taskId } = req.params;
  const task = await tasksService.getTaskById(taskId);
  res.json(task);
});

router.route('/').post(async (req, res) => {
  const boardId = req.params.id;
  const { title, order, description, userId, columnId } = req.body;
  const task = await tasksService.createTask({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  res.json(task);
});

module.exports = router;

const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { isBoard } = require('./validator');
const tasksRouter = require('../tasks/tasks.router');

router.use('/:id/tasks', tasksRouter);

router.route('/').get(async (req, res) => {
  const board = await boardsService.getAll();
  res.json(board.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const board = await boardsService.getBoard(id);
  isBoard(board, res);
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const data = req.body;
  const board = await boardsService.createBoard(data);
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const idBoard = req.params.id;
  const { title, columns } = req.body;
  const updateBoard = await boardsService.updateBoard(idBoard, title, columns);
  res.json(updateBoard);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const board = await boardsService.deleteBoard(id);
  isBoard(board, res);
  res.json({ message: 'Board was removed', board });
});

module.exports = router;

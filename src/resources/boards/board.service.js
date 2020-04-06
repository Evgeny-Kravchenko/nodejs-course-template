const boardRepo = require('./board.memory.repository');
const Column = require('./column.model');
const Board = require('./board.model');
const tasksService = require('../tasks/tasks.service');

const getAll = () => boardRepo.getAll();

const getBoard = async id => {
  return await boardRepo.getBoard(id);
};

const createBoard = async data => {
  let { columns } = data;
  const { title } = data;
  if (columns) {
    columns = await columns.map(item => new Column(item));
  }
  return await boardRepo.createBoard(new Board({ title, columns }));
};

const updateBoard = (idBoard, title, columns) => {
  return boardRepo.updateBoard({ idBoard, title, columns });
};

const deleteBoard = async id => {
  const board = boardRepo.getBoard(id);
  const isDeleted = await boardRepo.deleteBoard(id);
  if (isDeleted) {
    tasksService.deleteTasksByBoardId(id);
  }
  return isDeleted ? board : false;
};

module.exports = { getAll, createBoard, getBoard, updateBoard, deleteBoard };

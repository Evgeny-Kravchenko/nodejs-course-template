const boards = [];

const getAll = async () => {
  return boards;
};

const getBoard = async id => {
  return boards.find(item => item.id === id);
};

const createBoard = async board => {
  boards.push(board);
  return board;
};

module.exports = { getAll, createBoard, getBoard };

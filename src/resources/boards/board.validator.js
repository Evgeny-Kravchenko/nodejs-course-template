const isBoard = (board, res) => {
  if (!board) {
    res.status(404);
  }
};

module.exports = { isBoard };

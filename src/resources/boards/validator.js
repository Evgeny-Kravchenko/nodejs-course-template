const isBoard = (board, res) => {
  if (!board) {
    res.status(404).send("Board didn't found");
  }
};

module.exports = { isBoard };

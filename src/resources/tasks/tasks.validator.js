const isValidParameters = (task, res) => {
  if (!task) {
    res.status(400);
  }
};

module.exports = { isValidParameters };

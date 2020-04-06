const isTask = (task, res) => {
  if (!task) {
    res.status(404);
  }
};

module.exports = { isTask };

const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const user = await usersService.getUser(id);
  res.json(user);
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const userInfo = await usersService.createUser(name, login, password);
  res.json(userInfo);
});

module.exports = router;

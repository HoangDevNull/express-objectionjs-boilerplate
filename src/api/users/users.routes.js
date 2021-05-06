const express = require('express');

const userService = require('./users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await userService.getAll();
  res.json(user);
});

module.exports = router;

const express = require('express');

const User = require('./users.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.query().select('*');
  res.json(user);
});

module.exports = router;

const express = require('express');

const project = require('../constants/project');

const users = require('./users/users.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/users', users);

module.exports = router;

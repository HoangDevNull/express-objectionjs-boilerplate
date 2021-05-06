const express = require('express');

const project = require('../constants/project');

const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/users', users);
router.use('/auth', auth);

module.exports = router;

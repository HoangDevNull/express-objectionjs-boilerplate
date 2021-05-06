const express = require('express');
const yup = require('yup');

const router = express.Router();

const Auth = require('./auth.service');
const User = require('../users/users.service');
const jwt = require('../../lib/jwt');

const validator = yup.object().shape({
  username: yup.string().trim().min(2).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
});

const errorMessages = {
  invalidLogin: 'Invalid login.',
  emailInUse: 'Email in use.',
};

router.post('/signup', async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const createUser = { username, password, email };
    await validator.validate(createUser, {
      abortEarly: false,
    });
    // Check exist user
    const existingUser = await Auth.checkExistUser(email);
    if (existingUser) {
      res.status(409);
      throw new Error(errorMessages.emailInUse);
    }
    // Create new user
    const insertedUser = await Auth.createUser(createUser);
    const token = await jwt.sign({
      id: insertedUser.id,
      username,
      email,
    });
    res.json({ user: insertedUser, token });
  } catch (err) {
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findUserByEmail(email);
    if (!foundUser) {
      res.status(403);
      throw new Error(errorMessages.invalidLogin);
    }

    const validPassword = await Auth.comparePassword(
      password,
      foundUser.password
    );

    if (!validPassword) {
      res.status(403);
      throw new Error(errorMessages.invalidLogin);
    }
    const token = await jwt.sign({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    });
    res.json({
      user: foundUser,
      token,
    });
  } catch (error) {
    res.status(403);
    next(error);
  }
});

router.post('/token', async (req, res, next) => {
  const { token } = req.body;
  try {
    const decoded = await jwt.verify(token);
    res.json(decoded);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

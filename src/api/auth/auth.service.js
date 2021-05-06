const bcrypt = require('bcrypt');

const User = require('../users/users.model');

const checkExistUser = async (email) => {
  const existingUser = await User.query().first().where({ email });
  return existingUser;
};

const createUser = async (user) => {
  const { password, username, email } = user;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);
  const insertedUser = await User.query()
    .insert({
      email,
      username,
      password: hashedPassword,
    })
    .returning('*');
  return insertedUser;
};

const comparePassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

module.exports = {
  checkExistUser,
  createUser,
  comparePassword,
};

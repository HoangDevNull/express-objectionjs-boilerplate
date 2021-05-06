const User = require('./users.model');

const getAll = async () => {
  const user = await User.query();
  return user;
};

const findUserByEmail = async (email) => {
  const user = await User.query()
    .first()
    .where({ email })
    .whereNotNull('password');
  return user;
};

module.exports = {
  getAll,
  findUserByEmail,
};

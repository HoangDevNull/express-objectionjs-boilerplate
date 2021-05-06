const User = require('./users.model');

const getAll = async () => {
  const user = await User.query();
  return user;
};

module.exports = {
  getAll,
};

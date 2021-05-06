const crypto = require('crypto');
const bcrypt = require('bcrypt');

const logger = require('../../src/lib/logger');
const tableNames = require('../../src/constants/tableNames');

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    email: 'cj@null.computer',
    name: 'CJ',
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

  if (process.env.NODE_ENV !== 'test') {
    logger.info(
      'User created:',
      {
        password,
      },
      createdUser
    );
  }
};

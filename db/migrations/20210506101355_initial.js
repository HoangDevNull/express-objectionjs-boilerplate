const tableNames = require('../../src/constants/tableNames');
const { email, addDefaultColumns } = require('../../src/lib/tableUtils');

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.user, (t) => {
      t.increments().notNullable();
      email(t, 'email').notNullable().unique();
      t.string('name').notNullable();
      t.string('password', 127).notNullable();
      t.datetime('last_login');
      addDefaultColumns(t);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all(
    [tableNames.user].map((tableName) =>
      knex.schema.dropTableIfExists(tableName)
    )
  );
};

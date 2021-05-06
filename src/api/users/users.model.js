const { Model } = require('objection');

const tableName = require('../../constants/tableNames');

class User extends Model {
  static get tableName() {
    return tableName.user;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}

module.exports = User;

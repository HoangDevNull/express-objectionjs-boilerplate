const { Model } = require('objection');

const tableName = require('../../constants/tableNames');

class User extends Model {
  static get tableName() {
    return tableName.user;
  }
}

module.exports = User;

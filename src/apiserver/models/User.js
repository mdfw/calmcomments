var Sequelize = require('sequelize');
var sequelize = CONFIG.database;
var bcrypt = require('bcrypt');
import { encryptPassword, passwordsMatch } from './passwordEncryption';

AccountSchema.methods.comparePassword = function comparePassword(candidate) {
  return passwordsMatch(candidate, this.encryptedPasswordHash, this.encryptedPasswordPepperId);
};

/* Can this account act on behalf of another account?
 * @param {number} *ignored* the Account id to check against.
 * @returns {bool} true if account can act on behalf of accountId
 * @note Currently, only checks if this account has an account type of admin or customer service
*/
AccountSchema.methods.canActOnBehalfOf = function canActOnBehalfOf(accountId) {  // eslint-disable-line
  if (this.accountType === AccountType.ADMIN
    || this.accountType === AccountType.CUSTSERVICE) {
    return true;
  }
  return false;
};

/* Find an account by an accountId
 * @param {number} accountId - the account id
 * @returns {promise} - a promise to find something
 */
AccountSchema.statics.findOneAccount = function findAccountById(accountId) {
  return this.findOne({ accountId: accountId }).exec();
};

/* Find an account by an email address
 * @param {string} email - the associated email address
 * @returns {promise} - a promise to find something
 */
AccountSchema.statics.findOneByEmail = function findAccountByEmail(email) {
  return this.findOne({ email: email }).exec();
};



module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    underscored: true,
    displayName: {
      Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    email: {
      Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 50],
      },
    },
    encryptedPasswordHash: {
      Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    encryptedPasswordPepperId: {
      Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    indexes: [{
      unique: true, 
      fields: ['email']
    }],
    instanceMethods: {
      setPassword: function(value)
    } 
  });


  return User;
};




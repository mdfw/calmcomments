import { encryptPassword, passwordsMatch } from './passwordEncryption';
import { appraisePassword } from '../../shared/helpers/appraise';

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 50],
      },
    },
    encryptedPasswordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    encryptedPasswordPepperId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    instanceMethods: {
      setPassword: function setPassword(password) {
        const self = this;
        return Promise.resolve(appraisePassword(password))
          .then(function checkAppraisal(appraisalMessages) {
            if (appraisalMessages.length > 0) {
              throw new Error(appraisalMessages.join(', '));
            }
            return password;
          })
          .then(function runHashing(passwordValue) {
            return encryptPassword(passwordValue);
          })
          .then((encryptedValue) => {
            console.log('Got encrypted value: ');
            console.dir(encryptedValue);
            self.encryptedPasswordHash = encryptedValue.encrypted;
            self.encryptedPasswordPepperId = encryptedValue.pepperId;
          })
          .catch((err) => {
            throw err;
          });
        },
        toJSON: function () {
          var values = Object.assign({}, this.get());
          delete values.encryptedPasswordHash;
          return values;
        }
 
      }
  });
  return Account;
};

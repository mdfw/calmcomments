import Sequelize from 'sequelize';
import Account from './Account';

const allConfigs = {
  development: {
    username: 'mdw',
    password: null,
    database: 'calmcomment',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};

const env = process.env.NODE_ENV || 'development';
const config = allConfigs[env];
let sequelize = null;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const db = {};

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }, function trapError(err) {
    console.log('Unable to connect to the database:', err);
  });

const accountModel = Account(sequelize, Sequelize);
db[accountModel.name] = accountModel;

Object.keys(db).forEach(function associateThem(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

sequelize
  .sync() //   .sync({ force: true })
  .then(() => {
    console.log('Synced models to database.');
  }, function trapSyncError(err) {
    console.log('An error occurred while creating the table:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


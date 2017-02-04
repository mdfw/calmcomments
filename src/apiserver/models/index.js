import Sequelize from 'sequelize';
import Account from './Account';
import Post from './Post';

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

/* Set up the general process */
const env = process.env.NODE_ENV || 'development';
const config = allConfigs[env];
let sequelize = null;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const db = {};

/* Connect and log in to postgres */
sequelize
  .authenticate()
  .then(() => {
    console.log('Success: Connection to Postgres established .');
  }, function trapError(err) {
    console.log('FAILURE: Unable to connect to the Postgres database:', err);
  });


/* Create the models
 * TODO: This is a manual update nightmare.
 */
const accountModel = Account(sequelize, Sequelize);
db[accountModel.name] = accountModel;
const postModel = Post(sequelize, Sequelize);
db[postModel.name] = postModel;


/* Do associations */
Object.keys(db).forEach(function associateThem(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

/* Push the models to the database */
sequelize
  .sync() //   .sync({ force: true }) <= removed as this drops the table
  .then(() => {
    console.log('Success: Synced models to database.');
  }, function trapSyncError(err) {
    console.log('FAILURE: An error occurred while creating the table:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


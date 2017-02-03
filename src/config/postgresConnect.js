import Sequelize from 'sequelize';

const sequelize = new Sequelize('calmcomment', 'mdw', 'null', {
  dialect: 'postgres', // or 'sqlite', 'postgres', 'mariadb'
  port: 5432, // or 5432 (for postgres)
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }, (err) => {
    console.log('Unable to connect to the database:', err);
  });

export default sequelize;

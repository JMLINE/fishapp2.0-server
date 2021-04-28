const Sequelize = require('sequelize');
// const sequelize = new Sequelize('fishingagain', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  ssl: process.env.ENVIRONMENT === 'production'
})

// sequelize.authenticate().then(
//   function () {
//     console.log('Connected to fish-app postgres database');
//   },
//   function (err) {
//     console.log(err);
//   }
// );
module.exports = sequelize;
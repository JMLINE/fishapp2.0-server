const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorize: false
    }
  }
})

sequelize.authenticate().then(
  function () {
    console.log('Connected to fishing-app postgres database');
  },
  function (err) {
    console.log(err);
  }
);
module.exports = sequelize;
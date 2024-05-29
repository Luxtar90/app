const sequelize = require('../config/database');
const User = require('./user');

const syncDb = async () => {
  try {
    await sequelize.sync({ force: true }); // force: true recrea las tablas en cada inicio, quítalo en producción
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to create the database:', error);
  }
};

module.exports = {
  User,
  syncDb,
};

const sequelize = require('./config/database');
const User = require('./user');

const syncDb = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

module.exports = { syncDb, User };

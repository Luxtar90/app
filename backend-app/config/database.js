const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Este archivo se creará en el directorio raíz de tu proyecto backend
});

module.exports = sequelize;

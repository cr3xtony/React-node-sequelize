const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'Current-Root-Password', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = sequelize;
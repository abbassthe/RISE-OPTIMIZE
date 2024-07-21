const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Failed to synchronize models:', error);
  }
};

syncModels();

module.exports = db;

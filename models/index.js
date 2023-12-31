const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/dbConfig'); // Assuming dbConfig.js is in the root directory

const basename = path.basename(__filename);
const db = {};

const sequelize = config;  // Use the sequelize instance from dbConfig.js

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

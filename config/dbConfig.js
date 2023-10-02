// dbConfig.js

require('dotenv').config();  // Load environment variables from .env file
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false  // This is important to connect to Railway's PostgreSQL instances.
        }
    }
});

module.exports = sequelize;

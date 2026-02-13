const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const storagePath = process.env.DB_STORAGE || path.join(process.cwd(), 'database', 'database.sqlite');

// Initialize Sequelize (runtime instance)
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: storagePath,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    min: parseInt(process.env.DB_POOL_MIN) || 0,
    max: parseInt(process.env.DB_POOL_MAX) || 5,
    idle: 10000
  }
});

// Sequelize CLI config
const sequelizeConfig = {
  development: {
    username: process.env.DB_USER || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || null,
    host: process.env.DB_HOST || null,
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: storagePath,
    seederStorage: 'sequelize'
  },
  production: {
    username: process.env.DB_USER || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || null,
    host: process.env.DB_HOST || null,
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: storagePath,
    seederStorage: 'sequelize'
  }
};

// Application config
const appConfig = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    storage: storagePath,
    seederStorage: 'sequelize',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE
  },
  whatsapp: {
    apiUrl: process.env.WHATSAPP_API_URL,
    apiKey: process.env.WHATSAPP_API_KEY,
    phoneNumber: process.env.WHATSAPP_PHONE_NUMBER
  },
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  }
};

module.exports = sequelizeConfig;
module.exports.sequelize = sequelize;
module.exports.appConfig = appConfig;

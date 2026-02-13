const Sequelize = require('sequelize');
const { sequelize } = require('../config');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  otp: {
    type: Sequelize.STRING,
    allowNull: true
  },
  otpExpiry: {
    type: Sequelize.DATE,
    allowNull: true
  },
  isOtpVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isPasswordVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  loginMethod: {
    type: Sequelize.ENUM('password', 'otp', 'both'),
    defaultValue: 'password',
    comment: 'password = password required, otp = otp required, both = either password or otp'
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  lastLoginAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  passwordChangedAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;

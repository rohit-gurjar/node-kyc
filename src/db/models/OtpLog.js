const Sequelize = require('sequelize');
const { sequelize } = require('../config');

const OtpLog = sequelize.define('otplog', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  otp: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  isUsed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  usedAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  purpose: {
    type: Sequelize.ENUM('login', 'forgot_password', 'verification'),
    defaultValue: 'login'
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
  tableName: 'otp_logs',
  timestamps: true
});

module.exports = OtpLog;

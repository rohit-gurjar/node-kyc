const Sequelize = require('sequelize');
const { sequelize } = require('../config');

const PasswordReset = sequelize.define('passwordreset', {
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
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
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
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'password_resets',
  timestamps: true
});

module.exports = PasswordReset;

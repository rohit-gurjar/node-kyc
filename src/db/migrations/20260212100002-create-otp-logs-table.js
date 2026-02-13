'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('otp_logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('otp_logs');
  }
};

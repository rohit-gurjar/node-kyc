const { sequelize } = require('./config');

// Import Sequelize model instances (already defined using the shared sequelize instance)
const UserModel = require('./models/User');
const OtpLogModel = require('./models/OtpLog');
const PasswordResetModel = require('./models/PasswordReset');

// Ensure models are associated to the same sequelize instance (they already require the shared instance)
module.exports = {
  sequelize,
  UserModel,
  OtpLogModel,
  PasswordResetModel,
};
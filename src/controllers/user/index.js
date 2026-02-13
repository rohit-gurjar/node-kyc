const { signup } = require('./signup');
const { login } = require('./login');
const { sendOTPController } = require('./send-otp');
const { verifyOTPController } = require('./verify-otp');
const { forgotPasswordController } = require('./forgot-password');
const { resetPasswordController } = require('./reset-password');
const { changePasswordController } = require('./change-password');

module.exports = {
  signup,
  login,
  sendOTPController,
  verifyOTPController,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController
};

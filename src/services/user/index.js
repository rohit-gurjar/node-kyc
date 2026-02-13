const { signupUser } = require('./signup');
const { loginUser } = require('./login');
const { sendOTP } = require('./otp');
const { verifyOTP } = require('./verify-otp');
const { forgotPassword } = require('./forgot-password');
const { resetPassword } = require('./reset-password');
const { changePassword } = require('./change-password');

module.exports = {
  signupUser,
  loginUser,
  sendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
  changePassword
};

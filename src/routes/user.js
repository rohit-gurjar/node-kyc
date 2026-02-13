const express = require('express');
const { login, signup, changePasswordController, forgotPasswordController, resetPasswordController, sendOTPController, verifyOTPController } = require('../controllers/user/');
const { authenticateToken } = require('../middleware/auth');
const user = express.Router();

user.post('/login', login);
user.post('/sign-up', signup);
user.post('/forgot-password', forgotPasswordController);
user.post('/reset-password', resetPasswordController);
user.post('/change-password', authenticateToken, changePasswordController);
user.post('/send-otp', sendOTPController);
user.post('/verify-otp', verifyOTPController);

module.exports = user;
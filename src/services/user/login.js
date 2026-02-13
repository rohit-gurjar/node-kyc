const { UserModel, OtpLogModel } = require('../../db');
const { comparePassword } = require('../../utils/compare-password');
const { generateJWT } = require('../../utils/jwtHelper');

const loginUser = async (email, password = null, otp = null) => {
  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user || !user.isActive) {
      throw new Error('User not found or account is inactive');
    }

    // Check login method
    if (user.loginMethod === 'password' || user.loginMethod === 'both') {
      if (!password) {
        throw new Error('Password is required for this account');
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
    }

    if (user.loginMethod === 'otp' || user.loginMethod === 'both') {
      if (!otp) {
        throw new Error('OTP is required for this account');
      }

      const otpLog = await OtpLogModel.findOne({
        where: {
          userId: user.id,
          otp,
          isUsed: false,
          purpose: 'login'
        }
      });

      if (!otpLog || new Date() > otpLog.expiresAt) {
        throw new Error('Invalid or expired OTP');
      }

      otpLog.isUsed = true;
      otpLog.usedAt = new Date();
      await otpLog.save();
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate JWT
    const token = generateJWT({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    };
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

module.exports = { loginUser };

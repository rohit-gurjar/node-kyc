const { UserModel, PasswordResetModel } = require('../../db');
const { generateToken } = require('../../utils/generate-token');
const { getPasswordResetExpiry } = require('../../utils/reset-password-expiry');

const forgotPassword = async (email) => {
  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw new Error('User with this email not found');
    }

    const resetToken = generateToken();
    const expiresAt = getPasswordResetExpiry();

    await PasswordResetModel.create({
      userId: user.id,
      token: resetToken,
      expiresAt
    });

    // In production, send this token via email
    return {
      success: true,
      message: 'Password reset email sent successfully',
      resetToken, // In production, don't return this
      expiresIn: '1 hour'
    };
  } catch (error) {
    throw new Error('Forgot password failed: ' + error.message);
  }
};

module.exports = { forgotPassword };

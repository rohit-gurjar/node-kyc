const { UserModel, PasswordResetModel } = require('../../db');
const { hashPassword } = require('../../utils/hash-password');

const resetPassword = async (resetToken, newPassword) => {
  try {
    const resetRecord = await PasswordResetModel.findOne({
      where: {
        token: resetToken,
        isUsed: false
      }
    });

    if (!resetRecord) {
      throw new Error('Invalid or expired reset token');
    }

    if (new Date() > resetRecord.expiresAt) {
      throw new Error('Reset token has expired');
    }

    const user = await UserModel.findByPk(resetRecord.userId);
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    user.passwordChangedAt = new Date();
    await UserModel.save();

    resetRecord.isUsed = true;
    resetRecord.usedAt = new Date();
    await resetRecord.save();

    return {
      success: true,
      message: 'Password reset successfully'
    };
  } catch (error) {
    throw new Error('Password reset failed: ' + error.message);
  }
};

module.exports = { resetPassword };

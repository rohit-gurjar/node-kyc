const { UserModel } = require('../../db');
const { hashPassword } = require('../../utils/hash-password');
const { comparePassword } = require('../../utils/compare-password');

const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await UserModel.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Old password is incorrect');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    return {
      success: true,
      message: 'Password changed successfully'
    };
  } catch (error) {
    throw new Error('Change password failed: ' + error.message);
  }
};

module.exports = { changePassword };

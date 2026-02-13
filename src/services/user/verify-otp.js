const { UserModel, OtpLogModel } = require('../../db');

const verifyOTP = async (userId, otp) => {
  try {
    const otpLog = await OtpLogModel.findOne({
      where: {
        userId,
        otp,
        isUsed: false
      }
    });

    if (!otpLog) {
      throw new Error('Invalid or expired OTP');
    }

    if (new Date() > otpLog.expiresAt) {
      throw new Error('OTP has expired');
    }

    // Mark OTP as used
    otpLog.isUsed = true;
    otpLog.usedAt = new Date();
    await otpLog.save();

    // Update user
    const user = await UserModel.findByPk(userId);
    user.isOtpVerified = true;
    await user.save();

    return {
      success: true,
      message: 'OTP verified successfully'
    };
  } catch (error) {
    throw new Error('OTP verification failed: ' + error.message);
  }
};

module.exports = { verifyOTP };

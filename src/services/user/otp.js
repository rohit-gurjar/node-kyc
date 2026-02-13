const { UserModel, OtpLogModel } = require('../../db');
const { generateOTP } = require('../../utils/generate-otp');
const { getOTPExpiry } = require('../../utils/otp-expiry');
const { sendOTPViaWhatsApp } = require('../../utils/whatsappService');

const sendOTP = async (userId, purpose = 'login') => {
  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const otp = generateOTP();
    const expiresAt = getOTPExpiry();

    // Save OTP log
    await OtpLogModel.create({
      userId: user.id,
      otp,
      expiresAt,
      purpose
    });

    // Send via WhatsApp
    const result = await sendOTPViaWhatsApp(user.phoneNumber, otp);

    if (!result.success) {
      throw new Error(result.message);
    }

    return {
      success: true,
      message: 'OTP sent successfully via WhatsApp',
      expiresIn: '10 minutes'
    };
  } catch (error) {
    throw new Error('Failed to send OTP: ' + error.message);
  }
};

module.exports = { sendOTP };

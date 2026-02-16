const { UserModel } = require("../../db");
const { hashPassword } = require("../../utils/hash-password");
const { generateOTP } = require("../../utils/generate-otp");
const { getOTPExpiry } = require("../../utils/otp-expiry");
const { sendOTPViaWhatsApp } = require("../../utils/whatsappService");
const { Op } = require("sequelize");

const { generateJWT } = require("../../utils/jwtHelper");

const signupUser = async (value) => {
  const {firstName, lastName, email, phoneNumber, password, loginMethod} = value
  try {
    const existingUser = await UserModel.findOne({
      where: {
        [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
      },
    });

    if (existingUser) {
      throw new Error("User with this email or phone number already exists");
    }

    // Hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    // Create user
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      loginMethod,
      isPasswordVerified: !!password,
    });

    const accessToken = generateJWT({
      id: user.id,
      email: user.email,
    });

    // If OTP is a login method, send OTP
    if (loginMethod === "otp") {
      await sendOTPViaWhatsApp(user.id, "verification");
    }

    return {
      success: true,
      message: "User registered successfully",
      accessToken,
      user,
    };
  } catch (error) {
    throw new Error("Signup failed: " + error.message);
  }
};

module.exports = { signupUser };

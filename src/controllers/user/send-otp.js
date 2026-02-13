const Joi = require('joi');
const { sendOTP } = require('../../services/user');

const sendOTPController = async (req, res) => {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      purpose: Joi.string().valid('login', 'forgot_password', 'verification').optional()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const result = await sendOTP(value.userId, value.purpose || 'login');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { sendOTPController };

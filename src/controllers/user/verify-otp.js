const Joi = require('joi');
const { verifyOTP } = require('../../services/user');

const verifyOTPController = async (req, res) => {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      otp: Joi.string().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const result = await verifyOTP(value.userId, value.otp);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { verifyOTPController };

const Joi = require('joi');
const { forgotPassword } = require('../../services/user');

const forgotPasswordController = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const result = await forgotPassword(value.email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { forgotPasswordController };

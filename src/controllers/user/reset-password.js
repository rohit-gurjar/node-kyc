const Joi = require('joi');
const { resetPassword } = require('../../services/user');

const resetPasswordController = async (req, res) => {
  try {
    const schema = Joi.object({
      resetToken: Joi.string().required(),
      newPassword: Joi.string().min(6).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const result = await resetPassword(value.resetToken, value.newPassword);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { resetPasswordController };

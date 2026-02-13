const Joi = require('joi');
const { changePassword } = require('../../services/user');

const changePasswordController = async (req, res) => {
  try {
    const schema = Joi.object({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().min(6).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const userId = req.user.id; // From auth middleware
    const result = await changePassword(userId, value.oldPassword, value.newPassword);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { changePasswordController };

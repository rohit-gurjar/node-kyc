const Joi = require('joi');
const { signupUser } = require('../../services/user');

const signup = async (req, res) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().min(6).optional(),
      loginMethod: Joi.string().valid('password', 'otp', 'both').optional()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const result = await signupUser(
      value.firstName,
      value.lastName,
      value.email,
      value.phoneNumber,
      value.password,
      value.loginMethod || 'password'
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { signup };

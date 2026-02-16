const Joi = require('joi');

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().min(6).optional(),
  loginMethod: Joi.string().valid('password', 'otp', 'both').optional()
});

module.exports = { signupSchema };
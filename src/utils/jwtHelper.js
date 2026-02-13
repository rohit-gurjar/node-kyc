const jwt = require('jsonwebtoken');
const { appConfig } = require('../db/config');
const config = appConfig;

// Generate JWT token
const generateJWT = (payload) => {
  try {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expire
    });
  } catch (error) {
    throw new Error('Error generating JWT: ' + error.message);
  }
};

// Verify JWT token
const verifyJWT = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid or expired token: ' + error.message);
  }
};

module.exports = {
  generateJWT,
  verifyJWT
};

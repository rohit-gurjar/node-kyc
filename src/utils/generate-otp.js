const crypto = require('crypto');

const generateOTP = (length = 6) => {
  return crypto.randomInt(100000, 999999).toString();
};

module.exports = { generateOTP };

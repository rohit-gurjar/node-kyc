const getOTPExpiry = (minutes = 10) => {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60000);
};

module.exports = { getOTPExpiry };

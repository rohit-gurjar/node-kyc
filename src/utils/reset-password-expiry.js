const getPasswordResetExpiry = (hours = 1) => {
  const now = new Date();
  return new Date(now.getTime() + hours * 60 * 60000);
};

module.exports = { getPasswordResetExpiry };

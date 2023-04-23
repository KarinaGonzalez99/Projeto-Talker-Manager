const crypto = require('crypto');

const generateRandomToken = () => crypto.randomBytes(8).toString('hex');

const login = (_req, res) => {
  const token = generateRandomToken();
  return res.status(200).json({ token });
};

module.exports = { login };

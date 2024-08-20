const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.JWT_EXPIRES_IN;

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};

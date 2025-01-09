const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // user contains id and role from the token payload
    next();
  });
};

module.exports = authenticateToken;
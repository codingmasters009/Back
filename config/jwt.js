const crypto = require('crypto');

// Generate a random 256-bit secret key (32 bytes)
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log(jwtSecret);

module.exports = {
  jwtSecret,
  jwtExpiration: '1h', // Token expiration time
};

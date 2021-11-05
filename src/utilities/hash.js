const crypto = require('crypto');

module.exports = function createHash(text) {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
};
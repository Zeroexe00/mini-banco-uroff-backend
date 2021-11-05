const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config').keys;

const signToken = (payload) => {
  const options = { expiresIn: process.env.JWT_EXPIRES_IN };
  const token = jwt.sign({
    ...payload
  }, SECRET_KEY, options);
  return token;
};


const verifyToken = (token) => new Promise((resolve, reject) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    resolve(verify);
  } catch (error) {
    reject(error);
  }
});


module.exports = {
  signToken,
  verifyToken
};

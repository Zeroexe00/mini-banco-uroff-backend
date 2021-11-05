const jwt = require('jsonwebtoken');

const { SECRET_KEY, REFRESH_KEY } = require('../config').keys;

const getUserInfo = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email
});
///
const signToken = (payload) => {
  const options = { expiresIn: process.env.JWT_EXPIRES_IN };
  const token = jwt.sign({
    ...payload
  }, SECRET_KEY, options);
  return token;
};

const signRefreshToken = (payload) => {
  const options = { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN };
  const token = jwt.sign({
    ...payload
  }, REFRESH_KEY, options);
  return token;
};

const signResetToken = (payload) => {
  const options = { expiresIn: '30m' };
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

const verifyRefreshToken = (token) => new Promise((resolve, reject) => {
  try {
    const verify = jwt.verify(token, REFRESH_KEY);
    resolve(verify);
  } catch (error) {
    reject(error);
  }
});

module.exports = {
  signToken,
  signRefreshToken,
  signResetToken,
  verifyToken,
  getUserInfo,
  verifyRefreshToken
};

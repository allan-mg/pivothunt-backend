const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/config');

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(createError(401, 'Authorization required.'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, jwtSecret);

    req.user = payload;

    return next();
  } catch (err) {
    return next(createError(401, 'Invalid or expired token.'));
  }
}

module.exports = auth;

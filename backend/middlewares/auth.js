const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/auth-error');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthorizationError('Требуется авторизация'));
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'secret key');
  } catch (err) {
    return next(new AuthorizationError('Требуется авторизация'));
  }
  req.user = payload;
  return next();
};

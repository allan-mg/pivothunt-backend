const { NODE_ENV, JWT_SECRET, MONGODB_URI } = process.env;

const config = {
  jwtSecret:
    NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET || 'dev-secret',

  mongoUri:
    NODE_ENV === 'production'
      ? MONGODB_URI
      : MONGODB_URI || 'mongodb://127.0.0.1:27017/pivothunt',
};

module.exports = config;

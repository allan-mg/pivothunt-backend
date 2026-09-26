require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const { errors } = require('celebrate');

const { mongoUri } = require('./utils/config');

const routes = require('./routes');

const { validateSignup, validateSignin } = require('./middlewares/validation');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');

const { createUser, login } = require('./controllers/users');

const app = express();

const consoleLogger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.simple(),
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(requestLogger);

// PUBLIC AUTH ROUTES
app.post('/signup', validateSignup, createUser);

app.post('/signin', validateSignin, login);

// API ROUTES
app.use('/', routes);

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('PivotHunt API is running');
});

// 404
app.use((req, res, next) => {
  const err = new Error('Requested resource not found');
  err.statusCode = 404;
  next(err);
});

// ERROR HANDLING
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// DATABASE
mongoose
  .connect(mongoUri)
  .then(() => {
    consoleLogger.info('Connected to MongoDB');
  })
  .catch((err) => {
    consoleLogger.error(`MongoDB connection error: ${err.message}`);
  });

// SERVER
app.listen(PORT, () => {
  consoleLogger.info(`Server running on port ${PORT}`);
});

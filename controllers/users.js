const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/config');
const User = require('../models/user');

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

function createUser(req, res, next) {
  const {
    name, email, password, headline, location, avatar, skills,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
      headline,
      location,
      avatar,
      skills,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        location: user.location,
        avatar: user.avatar,
        skills: user.skills,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(createError(409, 'A user with this email already exists.'));
      }

      if (err.name === 'ValidationError') {
        return next(createError(400, 'Invalid user data.'));
      }

      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(createError(401, 'Incorrect email or password.'));
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return next(createError(401, 'Incorrect email or password.'));
        }

        const token = jwt.sign({ _id: user._id }, jwtSecret, {
          expiresIn: '7d',
        });

        return res.send({ token });
      });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(createError(404, 'User not found.'));
      }

      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        location: user.location,
        avatar: user.avatar,
        skills: user.skills,
      });
    })
    .catch(next);
}

function updateCurrentUser(req, res, next) {
  const { headline, location, skills } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      headline,
      location,
      skills,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(createError(404, 'User not found.'));
      }

      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        location: user.location,
        avatar: user.avatar,
        skills: user.skills,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(createError(400, 'Invalid profile data.'));
      }

      return next(err);
    });
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};

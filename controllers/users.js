const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function createUser(req, res) {
  const { name, email, password, headline, location, avatar, skills } =
    req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
        headline,
        location,
        avatar,
        skills,
      }),
    )
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
        return res.status(409).send({
          message: "A user with this email already exists.",
        });
      }

      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Invalid user data.",
        });
      }

      return res.status(500).send({
        message: "An error occurred while creating the user.",
      });
    });
}

function login(req, res) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: "Incorrect email or password.",
        });
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).send({
            message: "Incorrect email or password.",
          });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.send({ token });
      });
    })
    .catch((err) => {
      console.error(err);

      return res.status(500).send({
        message: "An error occurred while signing in.",
      });
    });
}

function getCurrentUser(req, res) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
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
      console.error(err);

      return res.status(500).send({
        message: "An error occurred while getting the user.",
      });
    });
}

function updateCurrentUser(req, res) {
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
        return res.status(404).send({
          message: "User not found.",
        });
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
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Invalid profile data.",
        });
      }

      return res.status(500).send({
        message: "An error occurred while updating the profile.",
      });
    });
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};

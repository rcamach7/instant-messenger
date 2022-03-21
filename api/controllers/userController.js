const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// ! Endpoint(s) for "/user/"
// Retrieves user by providing body fields and sends token
exports.login_user_get = [
  // Data Validation and sanitation.
  check("username").exists().bail().trim().isLength({ min: 4 }),
  check("password").exists().bail().trim().isLength({ min: 4 }),
  // Before attempting to authorize, check for validation errors.
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    }
    next();
  },
  passport.authenticate("local", {
    failureMessage: true,
    session: false,
  }),
  // Return JWT token upon validation
  (req, res, next) => {
    jwt.sign(
      { username: req.user.username, _id: req.user._id },
      process.env.SECRET_STRING,
      {
        expiresIn: "48h",
      },
      (err, token) => {
        if (err) next(err);

        res.json({ token });
      }
    );
  },
];

// Creates a user by providing body fields.
exports.create_user_post = [
  // Data Validation and sanitation.
  check("username")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 4 })
    .custom((value) => {
      // Makes sure the username is not already in use by another member
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject("Username Already Exists");
        }
      });
    }),
  check("password").exists().bail().trim().isLength({ min: 4 }),
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    }

    // Hash password for user security
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) next(err);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        friends: [],
      });
      newUser.save((err) => {
        if (err) next(err);

        // Create our JWT token and return to user, to be saved locally.
        // All tokens expire after an hour
        jwt.sign(
          {
            username: newUser.username,
            _id: newUser._id,
          },
          process.env.SECRET_STRING,
          {
            expiresIn: "1h",
          },
          (err, token) => {
            if (err) next(err);

            res.json({ token });
          }
        );
      });
    });
  },
];

// Updates user by providing body fields.
exports.update_user_put = (req, res, next) => {
  res.json("KK");
};

// Deletes user by providing body fields
exports.user_delete = (req, res, next) => {
  res.json("OK");
};

// * Protected test
exports.protected_get = [
  // Pull the token received and add it to the request.
  (req, res, next) => {
    // Pull the bearerHeader
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.status(403).json({
        message: "Protected route - not authorized",
      });
    }
  },
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_STRING, (err, authData) => {
      if (err) {
        res.status(403).json({ msg: "Failed authentication" });
      } else {
        // Only gets hit if user is authorized
        res.json({ msg: "Accessed protected route - success", authData });
      }
    });
  },
];

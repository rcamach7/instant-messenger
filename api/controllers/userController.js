const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const v4 = require("uuid").v4;
const { check, validationResult } = require("express-validator");

exports.user_get = [
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
  async (req, res) => {
    try {
      const { _id } = await jwt.verify(req.token, process.env.SECRET_STRING);
      const user = await User.findById(_id).select(
        "username fullName profilePicture _id"
      );

      return res.json(user);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
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
    .withMessage("Username must be at least 4 characters")
    .toLowerCase()
    .custom(async (value) => {
      // Makes sure the username is not already in use by another member
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject("Username already exists");
      }
    }),
  check("password")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
  check("fullName")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters"),
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    // Hash password for user security
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) next(err);

      const friendshipId = v4();
      // Create new user with defaulted values
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        fullName: req.body.fullName,
        profilePicture:
          "https://res.cloudinary.com/de2ymful4/image/upload/v1649203693/messenger/default_vrsymg.jpg",
        // Add my account as a friend by default
        friends: [
          {
            friend: new mongoose.Types.ObjectId("6258b8a8fee82b375b4b6b1d"),
            messages: [],
            _id: friendshipId,
          },
        ],
      });

      newUser.save((err) => {
        if (err) next(err);

        // Update my account to reflect the new user that was created
        User.updateOne(
          { _id: new mongoose.Types.ObjectId("6258b8a8fee82b375b4b6b1d") },
          {
            // Add new friend to main user and initiate a shared message history.
            $push: {
              friends: { friend: newUser._id, messages: [], _id: friendshipId },
            },
          }
        ).exec((err) => {
          if (err) next(err);

          // Create our JWT token with user information
          jwt.sign(
            {
              username: newUser.username,
              fullName: newUser.fullName,
              _id: newUser._id,
            },
            process.env.SECRET_STRING,
            (err, token) => {
              if (err) next(err);

              res.json({
                token,
                user: {
                  username: newUser.username,
                  fullName: newUser.fullName,
                  profilePicture: newUser.profilePicture,
                  _id: newUser._id,
                },
                msg: "Account created",
              });
            }
          );
        });
      });
    });
  },
];

// Updates user by providing body fields.
// At this point we only support updating name field.
// In the end we need to sign a new token, and have user replace the old one with the one we sent, since the old token is signed with old name.
// Possibly break it down to another middleware for easier maintainability
exports.update_user_put = [
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
        if (req.body.fullName.length >= 4) {
          User.findByIdAndUpdate(authData._id, {
            $set: { fullName: req.body.fullName },
          }).exec((err, updatedUser) => {
            if (err) next(err);

            // Create new token for our user and send it back
            jwt.sign(
              {
                username: updatedUser.username,
                fullName: updatedUser.fullName,
                _id: updatedUser._id,
              },
              process.env.SECRET_STRING,
              (err, token) => {
                if (err) next(err);

                res.json({
                  token,
                  user: {
                    username: updatedUser.username,
                    fullName: updatedUser.fullName,
                    profilePicture: updatedUser.profilePicture,
                    _id: updatedUser._id,
                  },
                  msg: "Account updated",
                });
              }
            );
          });
        } else {
          res.status(400).json({ msg: "Name too short" });
        }
      }
    });
  },
];

// Deletes user by providing body fields
exports.user_delete = (req, res, next) => {
  res.json("OK");
};

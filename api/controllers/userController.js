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
      const { _id } = jwt.verify(req.token, process.env.SECRET_STRING);
      const user = await User.findById(_id).select(
        "username fullName profilePicture _id"
      );

      return res.json({ user });
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
    // If no errors, move on to next middleware
    next();
  },
  // Will create new user and save to database.
  async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create new user with defaulted values, and save to database.
      const friendshipId = v4();
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
      await newUser.save();

      // Update my profile to have this user as a friend by default (already previously added myself to this user - now updating myself)
      await User.updateOne(
        { _id: new mongoose.Types.ObjectId("6258b8a8fee82b375b4b6b1d") },
        {
          // Add new friend to main user and initiate a shared message history.
          $push: {
            friends: { friend: newUser._id, messages: [], _id: friendshipId },
          },
        }
      );

      // Save info for next middleware and move on.
      res.locals.newUser = newUser;
      next();
    } catch (err) {
      req.status(403).json({ error: "Error creating new account" });
    }
  },
  // Will create a token and finish request by provided token and user information.
  async (req, res) => {
    try {
      // Create token for user.
      const token = jwt.sign(
        {
          username: res.locals.newUser.username,
          fullName: res.locals.newUser.fullName,
          _id: res.locals.newUser._id,
        },
        process.env.SECRET_STRING,
        {
          expiresIn: "24h",
        }
      );

      // End the response successfully
      res.json({
        token,
        user: {
          username: res.locals.newUser.username,
          fullName: res.locals.newUser.fullName,
          profilePicture: res.locals.newUser.profilePicture,
          _id: res.locals.newUser._id,
        },
        msg: "Account created",
      });
    } catch (error) {
      res.json({ error: "Error generating token" });
    }
  },
];

// Updates user by providing body fields.
// At this point we only support updating name field.
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
  async (req, res) => {
    // Check if it meets minimum size
    let newName = req.body.fullName;
    if (newName.length < 4) {
      return req.status(400).json({ error: "Name too short." });
    }

    try {
      // Grab auth data and retrieve user
      const authData = await jwt.verify(req.token, process.env.SECRET_STRING);
      const user = await User.findByIdAndUpdate(authData._id, {
        $set: { fullName: req.body.fullName },
      });

      // Create token
      const token = await jwt.sign(
        {
          username: user.username,
          fullName: user.fullName,
          _id: user._id,
        },
        process.env.SECRET_STRING,
        {
          expiresIn: "24h",
        }
      );

      // Respond with token and user information
      res.json({
        token,
        user: {
          username: user.username,
          fullName: req.body.fullName,
          profilePicture: user.profilePicture,
          _id: user._id,
        },
        msg: "Account updated",
      });
    } catch (error) {
      req.status(400).json({ error: "Error updating user" });
    }
  },
];

// Deletes user by providing body fields
exports.user_delete = (req, res, next) => {
  res.json("Not implemented");
};

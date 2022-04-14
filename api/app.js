const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Authentication libraries
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Import Route Controllers and models
const User = require("./models/User");
const appRoutes = require("./routes/appRoutes");

// Initiate our application
const app = express();

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Set up
const mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Set up local strategy for our authentication (passport.authentication() uses these settings)
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      // Error occurred in our search
      if (err) return done(err);

      // Validates username
      if (!user) {
        return done(null, false);
      }

      // Validates password
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);

        if (res) {
          // Password authenticated
          return done(null, user);
        } else {
          // passwords do not match
          return done(null, false);
        }
      });
    });
  })
);

// Define Routes
app.use("/users", appRoutes);

app.get("/", (req, res, next) => {
  res.json({ msg: "hello world" });
});

module.exports = app;

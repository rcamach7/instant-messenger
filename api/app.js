const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Import Route Controllers
const userRoutes = require("./routes/userRoutes");

// Initiate our application
const app = express();

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Set up
const mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Define Routes
app.use("/", (req, res, next) => {
  res.json({
    msg: "Welcome to my messenger app",
  });
});

app.use("/user", userRoutes);

module.exports = app;

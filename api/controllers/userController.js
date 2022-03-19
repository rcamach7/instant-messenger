const User = require("../models/User");

// ! Endpoint(s) for "/user/"
// Retrieves user by providing body fields
exports.user_get = (req, res, next) => {
  res.send("OK");
};

// Creates a user by providing body fields.
exports.create_user_post = (req, res, next) => {
  res.send("OK");
};

// Updates user by providing body fields.
exports.update_user_put = (req, res, next) => {
  res.send("OK");
};

// Deletes user by providing body fields
exports.user_delete = (req, res, next) => {
  res.send("OK");
};

// ! Endpoint(s) for "/user/log-in"
// Logs user in by providing body fields.
exports.login_post = (req, res, next) => {
  res.send("OK");
};

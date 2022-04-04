const passport = require("passport");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Retrieves user by providing body fields and sends token back.(client refreshes page which triggers get user end point, which is why we don't return user info)
exports.login_user_post = [
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
    session: false,
  }),
  // Return JWT token upon validation
  (req, res, next) => {
    jwt.sign(
      {
        username: req.user.username,
        _id: req.user._id,
        fullName: req.user.fullName,
      },
      process.env.SECRET_STRING,
      (err, token) => {
        if (err) next(err);

        res.json({ token });
      }
    );
  },
];

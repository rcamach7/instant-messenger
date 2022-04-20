const passport = require("passport");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Retrieves user by providing body fields and sends token back.(client refreshes page which triggers get user end point, which is why we don't return user info)
exports.login_user_post = [
  // Data Validation and sanitation.
  check("username").exists().bail().trim().isLength({ min: 4 }).toLowerCase(),
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
  async (req, res) => {
    try {
      const token = await jwt.sign(
        {
          username: req.user.username,
          _id: req.user._id,
          fullName: req.user.fullName,
        },
        process.env.SECRET_STRING,
        {
          expiresIn: "24h",
        }
      );
      // Give user authentication token
      res.json({ token });
    } catch (error) {
      req.status(400).json({ msg: "Error authenticating user" });
    }
  },
];

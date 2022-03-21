const User = require("../models/User");
const Friend = require("../models/Friend");
const jwt = require("jsonwebtoken");

// Returns the users friends and any data stored, such as messages.
exports.friends_get = [
  // Verify token exists. Then, pull the token received and add it to the request.
  (req, res, next) => {
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
  // Verify token is valid, and corresponds to a user, then process request.
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_STRING, (err, authData) => {
      if (err) {
        res.status(403).json({ msg: "Failed authentication" });
      } else {
        // Token validated, user details obtained
        User.findById(authData._id)
          .populate("friends")
          .exec((err, user) => {
            if (err) next(err);

            console.log(user);
            res.json(user);
          });
      }
    });
  },
];

// ! Sanitation to be implemented afterwards
exports.add_friend_post = [
  // Verify token exists. Then, pull the token received and add it to the request.
  (req, res, next) => {
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
  // Verify token is valid, and corresponds to a user, then pull user information from it.
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_STRING, (err, authData) => {
      if (err) {
        res.status(403).json({ msg: "Failed authentication" });
      } else {
        // Token validated, user details obtained
        // Look got the friend the user wants to add
        User.findOne({ username: req.body.friendUsername }).exec(
          (err, newFriendUser) => {
            if (err) next(err);

            // Create new friend instance using the ID of the friend's user profile
            const newFriend = new Friend({
              friend: newFriendUser._id,
              messages: [],
            });

            // If friend found, add friend to user friends list
            if (newFriendUser) {
              User.updateOne(
                { _id: authData._id },
                { $push: { friends: newFriend } }
              ).exec((err, result) => {
                if (err) next(err);

                res.status(201).json({
                  message: "Friend Added",
                });
              });
            } else {
              res.status(404).json({ msg: "Friend not found" });
            }
          }
        );
      }
    });
  },
];

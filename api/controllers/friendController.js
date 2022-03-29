const User = require("../models/User");
const jwt = require("jsonwebtoken");
const v4 = require("uuid").v4;

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
          .populate({
            path: "friends",
            populate: {
              path: "friend",
              model: "User",
              select: ["username", "fullName"],
            },
          })
          .exec((err, user) => {
            if (err) next(err);

            res.json({ friends: user.friends });
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

            const friendshipId = v4();
            const newFriend = {
              friend: newFriendUser._id,
              messages: [],
              _id: friendshipId,
            };

            // If friend found, add friend
            User.updateOne(
              { _id: authData._id },
              { $push: { friends: newFriend } }
            ).exec((err) => {
              if (err) next(err);

              const newFriendTwo = {
                friend: authData._id,
                messages: [],
                _id: friendshipId,
              };
              // Now we need to add the user to their friends list
              User.updateOne(
                { _id: newFriendUser._id },
                { $push: { friends: newFriendTwo } }
              ).exec((err) => {
                if (err) next(err);

                res.status(201).json({
                  message: "Friend Added",
                });
              });
            });
          }
        );
      }
    });
  },
];

exports.request_friend_post = [
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
        // Look got the friend the user wants to add
        User.findOne({ username: req.body.friendUsername }).exec(
          (err, foundUser) => {
            if (err) next(err);

            if (foundUser === null) {
              return res.status(400).json({ msg: "User does not exist" });
            }
            // First, update logged in user's requested list.
            User.updateOne(
              { _id: authData._id },
              { $push: { sentFriendRequests: { user: foundUser._id } } }
            ).exec((err) => {
              if (err) next(err);
              // Update other user to alert them of the request sent
              User.updateOne(
                { _id: foundUser._id },
                { $push: { receivedFriendRequests: { user: authData._id } } }
              ).exec((err) => {
                if (err) next(err);
                // Notify user of successful friend request
                res
                  .status(202)
                  .json({ msg: "Successfully sent friend request" });
              });
            });
          }
        );
      }
    });
  },
];

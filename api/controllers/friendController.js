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
          // Populate all fields that reference other users
          .populate({
            path: "friends",
            populate: {
              path: "friend",
              model: "User",
              select: ["username", "fullName", "profilePicture"],
            },
          })
          .populate({
            path: "receivedFriendRequests",
            populate: {
              path: "_id",
              model: "User",
              select: ["username", "fullName", "profilePicture"],
            },
          })
          .populate({
            path: "sentFriendRequests",
            populate: {
              path: "_id",
              model: "User",
              select: ["username", "fullName", "profilePicture"],
            },
          })
          .exec((err, user) => {
            if (err) next(err);

            res.json({
              friends: user.friends,
              receivedFriendRequests: user.receivedFriendRequests,
              sentFriendRequests: user.sentFriendRequests,
            });
          });
      }
    });
  },
];

// Needs to remove the pending request from the current user, and the "sent" request from the original user as well.
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
        // Look for the friend the user wants to add to see if he exists
        User.findOne({ username: req.body.friendUsername }).exec(
          (err, newFriendUser) => {
            if (err) next(err);

            if (newFriendUser === null) {
              return res.status(400).json({ msg: "User not found" });
            }

            // Create new friend object
            const friendshipId = v4();
            const newFriend = {
              friend: newFriendUser._id,
              messages: [],
              _id: friendshipId,
            };

            // If friend found, add friend to main user. Then remove requested user from the requested array
            User.updateOne(
              { _id: authData._id },
              {
                // Add new friend to main user and initiate a shared message history.
                $push: { friends: newFriend },
                // Remove the received request now that user has accepted request.
                $pullAll: {
                  receivedFriendRequests: [{ _id: newFriendUser._id }],
                },
              }
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
                {
                  // Add friend to friends list an initiate a message history
                  $push: { friends: newFriendTwo },
                  // Remove the previously sent request now that user has accepted request.
                  $pullAll: {
                    sentFriendRequests: [{ _id: authData._id }],
                  },
                }
              ).exec((err) => {
                if (err) next(err);

                // Respond with successful message.
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
  // Verify token is valid, and then check if user is already a friend, or there exists a pending friend request already.
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_STRING, (err, authData) => {
      if (err) {
        res.status(403).json({ msg: "Failed authentication" });
      } else {
        // Get potential friend information
        User.findOne({ username: req.body.friendUsername }).exec(
          (err, potentialFriend) => {
            if (err) next(err);
            // If user does not exists, end the connection and return error message.
            if (potentialFriend === null) {
              return res.status(400).json({ msg: "User does not exist" });
            }

            // If user is valid, pull current users information and verify potential friend isn't a friend already.
            User.findById(authData._id).exec((err, mainUser) => {
              if (err) next(err);

              // // Check to see if potentialFriend is already a friend
              for (let i = 0; i < mainUser.friends.length; i++) {
                if (mainUser.friends[i].friend.equals(potentialFriend._id)) {
                  return res
                    .status(400)
                    .json({ msg: "User is already a friend" });
                }
              }

              // Check to see if there exists a pending request already
              for (let i = 0; i < mainUser.receivedFriendRequests.length; i++) {
                if (
                  mainUser.receivedFriendRequests[i]._id.equals(
                    potentialFriend._id
                  )
                ) {
                  return res
                    .status(400)
                    .json({ msg: "User has already sent you a request" });
                }
              }

              // Check to see if there exists a pending request already
              for (let i = 0; i < mainUser.sentFriendRequests.length; i++) {
                if (
                  mainUser.sentFriendRequests[i]._id.equals(potentialFriend._id)
                ) {
                  return res.status(400).json({ msg: "Request already sent" });
                }
              }

              // Save user information to not begin another query
              res.locals.user = mainUser;
              res.locals.friend = potentialFriend;
              // Passed all checks, we can continue to next middleware that sends friend request.
              next();
            });
          }
        );
      }
    });
  },
  // Verify token is valid, and corresponds to a user, then pull user information from it.
  (req, res, next) => {
    // First, update logged in user's requested list.
    User.updateOne(
      { _id: res.locals.user._id },
      { $push: { sentFriendRequests: { _id: res.locals.friend._id } } }
    ).exec((err) => {
      if (err) next(err);
      // Update other user to alert them of the request sent
      User.updateOne(
        { _id: res.locals.friend._id },
        { $push: { receivedFriendRequests: { _id: res.locals.user._id } } }
      ).exec((err) => {
        if (err) next(err);
        // Notify user of successful friend request
        res.status(202).json({ msg: "Successfully sent friend request" });
      });
    });
  },
];

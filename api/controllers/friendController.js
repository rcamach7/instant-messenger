const User = require("../models/User");
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
          .populate({
            path: "friends",
            populate: {
              path: "friend",
              model: "User",
              select: "username",
            },
          })
          .exec((err, user) => {
            if (err) next(err);

            res.json(user.friends);
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

            const newFriend = {
              friend: newFriendUser._id,
              messages: [],
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

// * Message(s) controller
// Send message to a friend. We will need token to get user info, and friend username along with message to process request.
exports.message_friends_post = [
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
        //  We will be provided their token, and friendUsername of friend along with the content of the message.
        User.findOne({ username: req.body.friendUsername }).exec(
          (err, userFriend) => {
            if (err) next(err);

            // Create new message object to be added.
            const newMessage = {
              from: authData._id,
              to: userFriend._id,
              message: req.body.message,
              timestamp: new Date(),
            };

            // First update the user's profile with the new message
            User.updateOne(
              { _id: authData._id, "friends.friend": userFriend._id },
              { $push: { "friends.$.messages": newMessage } }
            ).exec((err) => {
              if (err) next(err);

              // Second update the friends profile with the new message
              User.updateOne(
                { _id: userFriend._id, "friends.friend": authData._id },
                { $push: { "friends.$.messages": newMessage } }
              ).exec((err) => {
                if (err) next(err);

                // Now we will emit a socket connection, to notify users of a new message and update their client.
                req.app.get("socketio").emit("chat message", newMessage);
                res.status(201).json(newMessage);
              });
            });
          }
        );
      }
    });
  },
];

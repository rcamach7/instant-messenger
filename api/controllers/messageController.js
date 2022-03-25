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
              ).exec((err, user) => {
                if (err) next(err);

                // Now we will emit a socket connection, to notify users of a new message and update their client.
                // req.app.get("socketio").emit("chat message", newMessage);
                req.app
                  .get("socketio")
                  .sockets.in(`${req.body._id}`)
                  .emit("chat message", newMessage);
                res.status(201).json({ message: newMessage });
              });
            });
          }
        );
      }
    });
  },
];

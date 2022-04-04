const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const profilePictureController = require("../controllers/profilePictureController");
const friendController = require("../controllers/friendController");
const messageController = require("../controllers/messageController");

// * User Controller
// Get user data if token is provided
router.get("/", userController.user_get);

// Creates a user by providing body fields.
router.post("/", userController.create_user_post);

// Updates user by providing body fields.
router.put("/", userController.update_user_put);

// Deletes user by providing body fields
router.delete("/", userController.user_delete);

// * Login controller
// Retrieves user by providing body fields.
router.post("/log-in", loginController.login_user_post);

// * ProfilePicture controller
// Sets profile picture for user by providing file
router.put(
  "/profilePicture",
  profilePictureController.update_profilePicture_put
);

// * Friend(s) controller
// Will return the list of friends and relevant data to user
router.get("/friends/", friendController.friends_get);

// Creates a new friend by using user token and provided friend username through body.
router.post("/friends/", friendController.add_friend_post);

// Requests to add another user by providing us the user's username
router.post("/friends/request/", friendController.request_friend_post);

// * Messages(s) controller
// Will send a message to one of their friends. We will be provided their token, and username of friend along with the content of the message.
router.post("/friends/messages/", messageController.message_friends_post);

module.exports = router;

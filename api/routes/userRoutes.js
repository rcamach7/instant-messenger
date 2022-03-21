const express = require("express");
const app = require("../app");
const router = express.Router();

const userController = require("../controllers/userController");
const friendController = require("../controllers/friendController");

// Retrieves user by providing body fields
router.get("/", userController.login_user_get);

// Creates a user by providing body fields.
router.post("/", userController.create_user_post);

// Updates user by providing body fields.
router.put("/", userController.update_user_put);

// Deletes user by providing body fields
router.delete("/", userController.user_delete);

// * Protected route test
router.get("/protected", userController.protected_get);

// * Friend(s) controller
// Creates a new friend by using user token and provided friend username through body.
router.post("/friends/", friendController.add_friend_post);

// Will return the list of friends and relevant data to user
router.get("/friends/", friendController.friends_get);

// * Messages(s) controller
// Will send a message to one of their friends. We will be provided their token, and username of friend along with the content of the message.
// router.post("/friends/messages", friendController.message_friends_post);

module.exports = router;

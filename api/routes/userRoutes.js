const express = require("express");
const app = require("../app");
const router = express.Router();

const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");
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
router.post("/friends/", friendController.add_friend_post);

module.exports = router;

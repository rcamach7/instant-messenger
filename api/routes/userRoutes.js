const express = require("express");
const app = require("../app");
const router = express.Router();

const userController = require("../controllers/userController");

// Retrieves user by providing body fields
router.get("/", userController.user_get);

// Creates a user by providing body fields.
router.post("/", userController.create_user_post);

// Updates user by providing body fields.
router.put("/", userController.update_user_put);

// Deletes user by providing body fields
router.delete("/", userController.user_delete);

// Logs user in by providing body fields.
router.post("/log-in", userController.login_post);

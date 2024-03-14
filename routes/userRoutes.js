const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// register
router.post("/register", userController.registerUser)

// login
router.post("/login", userController.loginUser)

// get user by id
router.get("/:id", userController.getUserByID)

module.exports = router
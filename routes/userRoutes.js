const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../auth')

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser)
router.get("/auth", auth, userController.authEnpoint)


module.exports = router;
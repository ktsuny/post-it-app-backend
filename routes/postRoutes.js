const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);

module.exports = router;
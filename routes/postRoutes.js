const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getPosts);
router.get("/:id", getPostByID);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
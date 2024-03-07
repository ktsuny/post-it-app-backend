const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const likesController = require("../controllers/likeController")

router.get("/", getPosts);
router.get("/:id", getPostByID);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.get("/:id/likes", likesController.getLikes)
router.post("/:id/like", likesController.addLike)
router.delete("/:id/unlike", likesController.deleteLikeByID)

module.exports = router;
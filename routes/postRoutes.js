const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const likesController = require("../controllers/likeController")
const requireAuth = require("../middleware/requireAuth")

router.get("/", postController.getPosts)
router.get("/:id", postController.getPostByID)
router.get("/:id/likes", likesController.getLikes)

// require auth middleware
router.use(requireAuth)

// get user specific posts
router.get("/user/:id", postController.getUserSpecificPosts)

// create post
router.post("/", postController.createPost)

// update post
router.put("/:id", postController.updatePost)

// delete post
router.delete("/:id", postController.deletePost)

// like post
router.post("/:id/like", likesController.handleLike)


module.exports = router;
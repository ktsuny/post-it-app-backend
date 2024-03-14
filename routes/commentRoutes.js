const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/commentController')
const requireAuth = require('../middleware/requireAuth')


// get comments for post
router.get('/:id', CommentController.getAllCommentsForPost)

// require auth
router.use(requireAuth)

// create comment
router.post('/', CommentController.addComment)

// delete comment
router.delete('/:id', CommentController.deleteCommentByID)

//update comment
router.put('/:id', CommentController.editCommentByID)

module.exports = router
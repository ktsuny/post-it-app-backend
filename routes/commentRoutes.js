const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/commentController')

router.get('/', CommentController.getAllComments)
router.post('/', CommentController.addComment)
router.delete('/:id', CommentController.deleteCommentByID)
router.put('/:id', CommentController.editCommentByID)

module.exports = router
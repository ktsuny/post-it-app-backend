const db = require("../database/config")

exports.addComment = async (req, res) => {
	try {

		if (
			!req.body.body ||
			!req.body.userID ||
			!req.body.postID
		){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { body, userID, postID } = req.body

		const query = `
			INSERT INTO Comments(body, postID, userID, createdAt, updatedAt)
				VALUES(?, ?, ?, NOW(), NOW())
			`
		const [result] = await db.pool.query(query, [body, postID, userID])

		return res.status(200).json(result)
	} catch (error) {
		res.status(500).send({message: error})
	}
}

exports.getAllCommentsForPost = async (req, res) => {
	try {
			const {id} = req.params

			const query = `
			SELECT Users.username, Users.userID, Posts.postID, Comments.commentID, Comments.body, Comments.createdAt
				FROM Comments
				INNER JOIN Users
				ON Users.userID = Comments.userID
				INNER JOIN Posts
				ON Posts.postID = Comments.postID
				WHERE Comments.postID = ?
			`
		const [rows] = await db.pool.query(query, [id])
		console.log(rows)
		return res.status(200).json(rows)
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.deleteCommentByID = async (req, res) => {
	try {
		
		const {id} = req.params

		// check if Comment exists
		const [comment] = await db.pool.query('SELECT * FROM Comments WHERE commentID = ?', [id])
		if (comment.length === 0) {
			return res.status(404).send({message: 'Comment not found'})
		}

		const query = `DELETE FROM Comments WHERE commentID = ?`
		await db.pool.query(query, [id])

		return res.status(204).send({message: 'Comment deleted successfully'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.editCommentByID = async (req, res) => {
	try {

		const {id} = req.params

		if (!req.body.body){
			return res.status(400).send({
        message: 'All fields required',
      })
		}

		const { body } = req.body
		
		const query1 = `
			SELECT commentID, body 
				FROM Comments 
				WHERE commentID = ?
			`
		const comment = await db.pool.query(query1, [id])

		// if comment exists, perform update
		if(comment){
			const query2 = `
			UPDATE Comments
				SET body = ?, updatedAt = NOW()
				WHERE commentID = ?
			`

			await db.pool.query(query2, [body, id])
		}
		
		return res.status(200).json({message: 'Comment successfully updated'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}
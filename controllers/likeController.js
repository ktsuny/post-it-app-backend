const db = require("../database/config")

exports.getLikes = async (req, res) => {
	try {
		const query = `
			SELECT likeID, Users.userID, Users.username, Posts.postID
			FROM Likes
				INNER JOIN Users
				ON Likes.userID = Users.userID
				INNER JOIN Posts
				ON Likes.postID = Posts.postID;
			`
		const [rows] = await db.pool.query(query)

		return res.status(200).json(rows)
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.addLike = async (req, res) => {
	try {
		if(
			!req.body.userID ||
			!req.body.postID
		){
			return res.status(400).send({
        message: 'All fields required',
      })
		}
		
		const {userID, postID} = req.body

		const query = `
		INSERT INTO Likes(userID, postID)
			VALUES(?, ?)`
		
		const [result] = await db.pool.query(query, [1, userID, postID])

		return res.status(200).json(result)
		
	} catch (error) {
		res.status(500).send({message: error})
	}
}

exports.deleteLikeByID = async (req, res) => {
	try {
		
		const {id} = req.params

		// check if like exists
		const [like] = await db.pool.query('SELECT * FROM Likes WHERE likeID = ?', [id])
		if(like.length === 0){
			return res.status(404).send({message: 'Like not found'})
		}

		const query = 'DELETE FROM Likes WHERE likeID = ?'
		await db.pool.query(query, [id])

		return res.status(204).send({message: 'Like deleted successfully'})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}
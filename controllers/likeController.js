const db = require("../database/config")

exports.getLikes = async (req, res) => {
	try {
		const postID = req.params.id

		const query = `
			SELECT * FROM Likes WHERE postID = ?;
			`
		const [rows] = await db.pool.query(query, [postID])

		return res.status(200).json( {totalLikes: rows.length})
	} catch (error) {
		res.status(500).send({message: error.message})
	}
}

exports.handleLike = async (req, res) => {
	try {
		const postID = req.params.id

		if(!req.body.userID ){
			return res.status(400).send({
        message: 'You must be signed in',
      })
		}
		
		const { userID } = req.body

		const query1 = `SELECT * FROM Likes WHERE userID = ? AND postID = ?`
{}
		const [like] = await db.pool.query(query1, [userID, postID])

		if(like.length > 0){
			console.log('no')
			const deleteLikeQuery = `DELETE FROM Likes WHERE userID = ? AND postID = ?`
			await db.pool.query(deleteLikeQuery, [userID, postID])
			return res.status(200).send({message: `Unliked post ${postID}`})
		} 

		const query2 = `
		INSERT INTO Likes(userID, postID)
			VALUES(?, ?)`
		
		const [result] = await db.pool.query(query2, [userID, postID])

		return res.status(200).json(result)
		
	} catch (error) {
		res.status(500).send({message: error})
	}
}

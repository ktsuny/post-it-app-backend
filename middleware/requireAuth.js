const jwt = require('jsonwebtoken')
const db = require("../database/config")

const requireAuth = async (req, res, next) => {

	// verify authentication
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({error: 'Authorization token required'})
	}

	const token = authorization.split(' ')[1]

	try {
		const { userID } = jwt.verify(token, process.env.JWT_SECRET)
		
		const [result] = await db.pool.query(`SELECT * FROM  users WHERE userID = ?`, [userID])

		req.user = result[0].userID
		console.log('user:', result[0].userID)
		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({message: 'Request not authorized'})
	}
}

module.exports = requireAuth
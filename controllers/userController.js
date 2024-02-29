const db = require("../database/config")

const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
	const { username, email, password } = req.body

	if (!username || !email || !password) {
		res.send({message: 'all fields must be filled out'})
	}

	hashedPassword = await bcrypt.hash(password, saltRounds)

	const [result] = await db.pool.query(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword])

	res.send(result)
}

exports.loginUser = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		res.send({message: 'all fields must be filled out'})
	}

	const [result] = await db.pool.query(`SELECT * FROM  users WHERE email = ?`, [email])

	if(result.length > 0){
		const match = await bcrypt.compare(password, result[0].password) 
			if(match){
				const token = jwt.sign(
					{
						userID:  result[0].userID,
						username: result[0].username
					},
					"RANDOM-TOKEN",
					{ expiresIn: "24h"}
				)
				res.status(200).send({
					message: "Login successful",
					username: result[0].username,
					token
				})
			} else{
				res.send({message: 'Incorrect password' })
			}	
	} else {
		res.send({message: 'Email does not exist' })
	}
}

exports.authEnpoint = (req, res) => {
	res.json({message: 'You are authorized'})
}
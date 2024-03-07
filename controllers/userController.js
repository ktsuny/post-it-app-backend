const db = require("../database/config")

const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const validator = require('validator')

exports.registerUser = async (req, res) => {
	const { username, email, password } = req.body

	//  validation
	if (!username || !email || !password) {
		return res.status(400).json({message: 'All fields must be filled out'})
	}

	if (!validator.isEmail(email)) {
		return res.status(400).json({message: 'Email is not valid'})
	}

	if (!validator.isStrongPassword(password)) {
		return res.status(400).json({message: 'Password not strong enough'})
	}

	try {
		const [check] = await db.pool.query('SELECT * FROM users WHERE email = ?', [email])
		if (check.length > 0){
			return res.json({message: 'Email already exists'})
		}
	
		hashedPassword = await bcrypt.hash(password, saltRounds)
	
		const [result] = await db.pool.query(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword])
	
		const token = jwt.sign(
			{
				userID:  result.insertId,
				username: username
			},
			process.env.JWT_SECRET,
			{ expiresIn: "24h"}
		)

		return res.status(200).json({
			message: "Registration successful",
			username: username,
			token
		})


	} catch (error) {
		return res.status(500).json({message: error.message})
	}


}

exports.loginUser = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({message: 'All fields must be filled out'})
	}

	try {
		const [result] = await db.pool.query(`SELECT * FROM  users WHERE email = ?`, [email])

		if(result.length > 0){
			const match = await bcrypt.compare(password, result[0].password) 
	
			if(!match){
				return res.status(400).json({message: 'Incorrect password' })
			}
	
			const token = jwt.sign(
				{
					userID:  result[0].userID,
					username: result[0].username
				},
				process.env.JWT_SECRET,
				{ expiresIn: "24h"}
			)
	
			return res.status(200).json({
				message: "Login successful",
				username: result[0].username,
				token
			})
	
		} else {
			return res.status(400).json({message: 'Incorrect email' })
		}
	} catch (error) {
		return res.status(500).json({message: error.message})
	}

}


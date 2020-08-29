require('dotenv').config();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req,res,next) {
	
	let token = req.headers['authorization']
	token = token.split(' ')[1]
	// console.log(token);
	// console.log(JSON.stringify(req.headers));
	
	// check if not token
	if (!token) {
		return res.status(401).json({ msg: 'Please login...'})
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' })
	}
}
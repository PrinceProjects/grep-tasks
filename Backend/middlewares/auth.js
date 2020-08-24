require('dotenv').config();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req,res,next) {
	
	// get token from header
	const token = req.header('x-auth-token');

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
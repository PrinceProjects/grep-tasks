const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator")
const User = require("../models/user")

// get all users
router.get('/', async (req,res) => {
	try {
		const users = await User.find()
		res.send(users)
	} catch (err) {
		res.status(500).json({message: err.message})
	}
})

// get one user
router.get('/:id', (req,res) => {
	res.send(`get the user with id ${req.params.id}`)
})

// create a user
router.post(
	'/', 
	[
		check("name").not().isEmpty().trim().escape(),
		check("password").not().isEmpty().trim().escape(),
		check("email").isEmail(),
	],
	async (req,res) => {
		// checkvalidation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		// hash password
		const hashedPassword = bcrypt.hashSync(password, 10);

		// insert data into database
		try {
		  const newUser = new User({
			name,
			email,
			password:hashedPassword
		  });

		  const user = await newUser.save();

		  res.json(user);
		} catch (err) {
		  console.error(err.message);
		  res.status(500).send('Server Error');
		}
	}
);

// update a user
router.patch('/:id', (req,res) => {
	res.json({"message":"update user route"})
})

// deleting a user
router.delete('/:id', (req,res) => {
	res.json({"message":"dalete a user"})
})

module.exports = router;
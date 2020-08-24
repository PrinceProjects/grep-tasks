const express = require("express");
const app = express();

const connectDB = require("./db");

connectDB();

const port = process.env.PORT || 5000;

app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
	res.send("Homepage")
})

app.post('/', (req,res) => {
	console.log(req.body);
	res.send(req.body);
})

app.use('/users', require("./routes/users"))
app.use('/auth', require("./routes/auth"))

app.listen(port, () => console.log(`Server running on port ${port}`));
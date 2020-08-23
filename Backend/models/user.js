const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongooose.model("User",userSchema)
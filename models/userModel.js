const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
        unique: [true, "Username is already taken"]
    },
    email: {
        type: String,
        required: [true, "Please enter email adderss"],
        unique: [true, "email address is already used"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    }
}, {
    timestamps : true
})

module.exports = mongoose.model("users", userSchema)
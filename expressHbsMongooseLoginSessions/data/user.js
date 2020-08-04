const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: false
})

module.exports = model('User', userSchema)
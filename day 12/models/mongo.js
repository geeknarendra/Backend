const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, default: ''},
    email: { type: String, default: ''},
    password: { type: String, default: ''},
})

module.exports = User = mongoose.model('user', UserSchema)
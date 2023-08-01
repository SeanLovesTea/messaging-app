const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  avatarUrl: { type: String }
})

const User = mongoose.model('User', userSchema)

module.exports = User
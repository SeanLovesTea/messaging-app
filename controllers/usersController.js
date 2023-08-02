const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Message = require('../models/Message')

exports.get_users = async(req, res, next) => {
  try {
    const userData = await User.find()
    const messageData = await Message.find({ username: req.user})
    res.render('index', { userData, messageData, receiverId: null })
  } catch (error) {
    next(error)
  }
}
exports.get_users_msg = async(req, res, next) => {
  try {
    const receiverId = req.params.id
    const userData = await User.find()
    const messageData = await Message.find({ username: req.user})
    res.render('messages', { userData, messageData, receiverId })
  } catch (error) {
    next(error)
  }
}
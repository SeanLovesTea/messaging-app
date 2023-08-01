const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req, res) => {
  res.render('index')
})
router.get('/sign-up', (req, res) => {
  res.render('sign-up')
})
router.post('/sign-up', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    const result = await user.save()
    res.redirect('/')
  } catch (error) {
    return next(error)
  }
})
// router.post('/', (req, res) => {

// })
module.exports = router;
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

router.get('/', (req, res) => {
  res.render('index')
  // res.render('index', )
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
router.get('/log-in', (req, res) => {
  res.render('login')
})
router.post('/log-in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}))
 

router.get('/log-out', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  }) 
})
module.exports = router;
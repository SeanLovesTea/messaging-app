const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const bcyrpt = require('bcryptjs')
const usersController = require('../controllers/usersController')

router.get('/',usersController.get_users, (req, res) => {

  res.render('index')
  // res.render('index', )
})

router.get('/sign-up', (req, res) => {
  res.render('sign-up')
})

router.post('/sign-up', async (req, res, next) => {
  
  try {
    const username = req.body.username
    const password = req.body.password
    bcyrpt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err)
      }
      const user = new User({
        username: username,
        password: hashedPassword
      })
      const result = await user.save()
      res.redirect('/')
    })
   
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
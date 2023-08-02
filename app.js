require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const connectDb = require('./config/mongodb')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')
const flash = require('connect-flash')
const bcrypt = require('bcryptjs')


const app = express()

connectDb()

const mainRoutes = require('./routes/route')

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname + '/public')))

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }))
app.use(express.urlencoded({ extended: false}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(function(req, res, next){
  res.locals.errors = req.flash("error");
  next();
})

passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user)
        } else {
          return done(null, false, { message: "Incorrect password" })
        }
      })
    } catch(err) {
      return done(err)
    }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err)
  }
})

app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})
app.use('/', mainRoutes)

app.listen(5000, () => console.log('App running on port 5000'))
require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const connectDb = require('./config/mongodb')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const app = express()

connectDb()

const mainRoutes = require('./routes/route')

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname + '/public')))

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false}))

app.use('/', mainRoutes)

app.listen(5000, () => console.log('App running on port 5000'))
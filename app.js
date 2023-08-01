require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const connectDb = require('./config/mongodb')
const path = require('path')

const app = express()

connectDb()

const mainRoutes = require('./routes/route')

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname + '/public')))
app.use('/', mainRoutes)


app.listen(5000, () => console.log('App running on port 5000'))
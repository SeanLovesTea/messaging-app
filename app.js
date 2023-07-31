require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const connectDb = require('./config/mongodb')

const app = express()

connectDb()


app.use(expressLayouts)
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(5000, () => console.log('App running on port 5000'))
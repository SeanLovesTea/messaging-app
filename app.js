const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()

app.use(expressLayouts)
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(5000, () => console.log('App running on port 5000'))
var express = require('express')
// var ejsLayouts = require('express-ejs-layouts')
const exphbs = require('express-handlebars')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/express-authentication')
} else {
  mongoose.connect('mongodb://localhost/express-authentication-test')
}

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

// change this to express-handlebars
// app.set('view engine', 'ejs')
// app.use(ejsLayouts)
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/profile', function (req, res) {
  res.render('profile')
})

// all the routes variables
const authRoutes = require('./routes/auth_routes')

// app.use('/auth', require('./controllers/auth'))
app.use('/', authRoutes)

const port = process.env.PORT || 3000
var server = app.listen(port, function () {
  console.log('express is running on port ' + port)
})

module.exports = server

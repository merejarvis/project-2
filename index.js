var express = require('express')
// var ejsLayouts = require('express-ejs-layouts')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const Question = require('./models/Question')

var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()

mongoose.connect('mongodb://localhost/project-2')

// if (process.env.NODE_ENV === 'test') {
//   mongoose.connect('mongodb://localhost/express-authentication-test')
// } else {
//   mongoose.connect('mongodb://localhost/express-authentication')
// }

// setup express session
app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost/project-2'
  }),
  secret: 'foo',
  resave: false,
  saveUninitialized: true
}))



// initialize passport
const passport = require('./config/passport')
app.use(passport.initialize())
// the line below must be AFTER the session setup
app.use(passport.session())
app.use(express.static('public'))
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// change this to express-handlebars
// app.set('view engine', 'ejs')
// app.use(ejsLayouts)
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  Question
  .find({}, function(err, allQn){
    if (err) return res.send(err)
  res.render('home', {
    user: req.user,
    allQn: allQn
  })
})
})

app.get('/profile', function (req, res) {
  res.render('profile', {
    user: req.user
  })
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
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

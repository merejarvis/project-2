var express = require('express')
// var ejsLayouts = require('express-ejs-layouts')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const Question = require('./models/Question')


var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project-2')

// setup express session
app.use(session({
  store: new MongoStore({
    url: process.env.MONGODB_URI || 'mongodb://localhost/project-2'
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


const authRoutes = require('./routes/auth_routes')
app.use('/', authRoutes)

const qnRoutes = require('./routes/qn_routes')
app.use('/', qnRoutes)

const ansRoutes = require('./routes/ans_routes')
app.use('/answer', ansRoutes)


app.get('/profile', function (req, res) {
  res.render('profile', {
    user: req.user
  })
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})


const port = process.env.PORT || 3000
var server = app.listen(port, function () {
  console.log('express is running on port ' + port)
})

module.exports = server

var express = require('express')
var router = express.Router()

const authController = require('../controllers/auth_controllers')

const passport =
require('../config/passport')

// path name
router.get('/register', function (req, res) {
  res.render('auth/signup') // view name
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

// passport.authenticate(<name of the strategy>, <post auth configuration, an obj>)

router.post('/login',
 passport.authenticate('local', {
   successRedirect: '/profile',
   failureRedirect: '/register'
 }))

router.get('/fblogin', passport.authenticate('facebook'))
router.get('/fbcallback',
  passport.authenticate('facebook',
    { failureRedirect: '/register' }
  ),
  function (req, res) {
    // Successful authentication, redirect home.
    res.send(req.user)
  }
)

router.post('/register', authController.register)

module.exports = router

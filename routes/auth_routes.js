var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser')
app = express()
app.use(bodyParser.json())



const authController = require('../controllers/auth_controllers')

const passport =
require('../config/passport')

// path name
router.get('/register', function (req, res) {
  if(req.user){
    return res.send('logout first')
  }
  res.render('auth/signup') // view name
})

router.get('/login', function (req, res) {
if(req.user){
  return res.send('logout first')
}
  res.render('auth/login')
})

router.post('/login',
 passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/register'
 }))



router.get('/fblogin', passport.authenticate('facebook', { scope : ['email']}))

router.get('/fbcallback',
  passport.authenticate('facebook',
    { successRedirect: '/',
    failureRedirect: '/register' }
  ))


router.post('/register', authController.register)


module.exports = router

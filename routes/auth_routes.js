var express = require('express')
var router = express.Router()

const authController = require('../controllers/auth_controllers')

// path name
router.get('/register', function (req, res) {
  res.render('auth/signup') // view name
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

router.post('/register', authController.register)

module.exports = router

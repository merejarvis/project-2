var express = require('express')
var router = express.Router()

// path name
router.get('/register', function (req, res) {
  res.render('auth/signup') // view name
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

module.exports = router

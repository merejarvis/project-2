const User = require('../models/User')

function register (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password,
    about: req.body.user.about
  })

  newUser.save(function (err, createdUser) {
    if (err) {
      return res.send(err)
    }
    res.redirect('/login') // ~~ client req GET /profile
  })
}


function show (req, res) {
  return res.send(req.body)

  }


module.exports = {
  register,
  show
  // login
}

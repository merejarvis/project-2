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
    res.redirect('/profile') // ~~ client req GET /profile
  })
}

// function show (req, res) {
//   User
//   .findOne({
//     _id: req.params.id
//   })
//  .populate('songs')
//   .exec(function (err, theAlbum) {
//     if (err) res.send(err)
//
//     res.render('albums/show', {
//       album: theAlbum
//     })
//   })
// }

function show (req, res) {
  return res.send(req.body)
  // User
  // .findOne({
  //   _id: req.session.passport.user
  // }, function(err, data) {
  //   if (err) return res.send(err)
  //   res.render('/profile', {
  //     data: data
    // })})}
  }


// function login (req, res) {
//   // find the user by email
//
//   User
//   .findOne({
//     email: req.body.user.email
//   })
//   .exec(function (err, foundUser) {
//     if (err) return res.send(err)
//
//     const formPassword = req.body.user.password
//
//     if (foundUser.validPassword(formPassword)) {
//       res.send('valid, redirect to profile')
//     } else {
//       res.send('invalid, show flash message')
//     }
//   })
//
//   // User.valid(req.body.user.password) // returns true or false
// }

module.exports = {
  register,
  show
  // login
}

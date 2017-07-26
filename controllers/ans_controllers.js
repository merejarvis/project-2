const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')

function showQn (req, res) {
  Question
  .findOne({
    _id: req.params.id
  }, function (err, theQn) {
    if (err) res.send(err)

    res.render('ans/answer', {
      theQn: theQn,
      user: req.user})
    })

  }

  function postAns (req, res) {
    var newAns = new Answer({
      answer: req.body.answer,
      user: req.user._id
    })

    newAns.save(function (err, createdAns) {
      if (err) {
        return res.send(err)
      }
      req.user.answer.push(newAns.id)
      req.user.save()
      res.redirect('/')
    // ~~ client req GET /profile
    })
  }


module.exports = {
    showQn,
    postAns
  }

const Question = require('../models/Question')

function postQn (req, res) {
  var newQn = new Question({
    question: req.body.question,
    user: req.session.password
  })

  newQn.save(function (err, createdQn) {
    if (err) {
      return res.send(err)
    }
    res.redirect('/')
  // ~~ client req GET /profile
  })
}

function showQn (req, res) {
  Question
  .find({}, function(err, allQn){
    if (err) return res.send(err)

    res.render('/home', {
      allQn: allQn
    })
  })
}

module.exports = {
  postQn,
  showQn
// login
}

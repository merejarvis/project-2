const Question = require('../models/Question')
const User = require('../models/User')

function postQn (req, res) {
  var newQn = new Question({
    question: req.body.question,
    user: req.user._id
  })

  newQn.save(function (err, createdQn) {
    if (err) {
      return res.send(err)
    }
    req.user.question.push(newQn.id)
    req.user.save()
    res.redirect('/')
  // ~~ client req GET /profile
  })
}


function showQn (req, res) {
Question
.find({})
.sort({date: -1}).populate('user')
.exec(function (err, allQn) {
  if (err) res.send(err)
res.render('home', {
  allQn: allQn,
  user: req.user
})
})
}


module.exports = {
  postQn,
  showQn
}

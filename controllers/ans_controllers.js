const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')

function showQn (req, res) {
  // Question
  // .findOne({
  //   _id: req.params.id
  // }, function (err, theQn) {
  //   if (err) res.send(err)

    Question
    .findOne({_id: req.params.id})
    .populate({path: 'answer', populate: {
       path: 'user'
     }, options: { sort: { date: -1 } } }).populate('user')
    .exec(function (err, reqQn) {
      if (err) res.send(err)
    res.render('ans/answer', {
      reqQn: reqQn,
      user: req.user
    })
    })
    }




    // Group
    //   .find({})
    //   .populate({path: 'Members', options: { sort: { 'created_at': -1 } } })


  //   res.render('ans/answer', {
  //     theQn: theQn,
  //     user: req.user})
  //   })
  //
  // }

  function postAns (req, res) {
    // res.send(req.body)
    var newAns = new Answer({
      answer: req.body.answer,
      user: req.user._id,
      question: req.body.qnRef
    })


    newAns.save(function (err, createdAns) {
      if (err) {
        return res.send(err)

      }
      // res.send(createdAns)
      req.user.answer.push(createdAns.id)
      req.user.save()

      Question
      .findOne({
        _id: req.body.qnRef
      }, function (err, theQn) {
        if (err) res.send(err)

        theQn.answer.push(createdAns.id)
        theQn.save()
        // res.send(theQn)
      })
//
//
//


      res.redirect(`/answer/${req.body.qnRef}`)
    // ~~ client req GET /profile
    })
  }


module.exports = {
    showQn,
    postAns
  }

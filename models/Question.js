const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Answer = require('./Answer')

const questionSchema = new Schema({
  question: String,
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  // fbid: String
})



const Question = mongoose.model('Question', questionSchema)

module.exports = Question

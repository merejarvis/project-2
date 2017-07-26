const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Question = require('./Question')


const answerSchema = new Schema({
  answer: String,
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  // fbid: String
})



const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer

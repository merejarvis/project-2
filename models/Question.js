const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Answer = require('./Answer')

const mongodbUrl = 'mongodb://localhost:27017/project-2'


mongoose.Promise = global.Promise
mongoose.connect(mongodbUrl, {
  useMongoClient: true
}).then(
  () => { console.log('mongodb is connected') },
  (err) => { console.log('connection err', err) }
)


const questionSchema = new Schema({
  question: String,
  date: {type: Date, default: Date.now},
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

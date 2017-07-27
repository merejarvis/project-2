const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Question = require('./Question')

const mongodbUrl = 'mongodb://localhost:27017/project-2'

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mydbname')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || mongodbUrl, {
  useMongoClient: true
}).then(
  () => { console.log('mongodb is connected') },
  (err) => { console.log('connection err', err) }
)


const answerSchema = new Schema({
  answer: String,
  date: {type: Date, default: Date.now},
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

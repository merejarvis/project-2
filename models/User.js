const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Question = require('./Question')
const Answer = require('./Answer')

const bcrypt = require('bcrypt')

const userSchema = new Schema({
  fbId: String,
  name: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  about: String,
  question: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]

})

userSchema.pre('save', function (next) {
  var user = this // this keyword ==> the newUser obj instance

   // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

   // hash the password ASYNCHRONOUSLY
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    // Override the cleartext password with the hashed one
    user.password = hash
    next() // call the save fn
  })
})

userSchema.methods.validPassword = function (givenPassword) {
  // t/f based on the user.hashed compared with form.password

  return bcrypt.compareSync(givenPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User

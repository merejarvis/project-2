const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// local strategy
passport.use(new LocalStrategy(localVerify))

// verify callback for local strategy
function localVerify (username, password, next) {
  console.log(`given data is ${username}, ${password}`)

  next(null, `given data is ${username}, ${password}`)
}

module.exports = passport

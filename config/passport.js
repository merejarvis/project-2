const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
// const GoogleStrategy = require('passport-google-oauth2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/User')

// it will store into the session, currently logged in user
// when success => next(null, foundUser)
passport.serializeUser(function (user, next) {
  next(null, user.id)
})

// it will open the session, and convert id stored in session into the actual user object, accessible in req.user
passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

// passport.use(new GoogleStrategy({
//     clientID:33577841680-5h9726vfm3udd4217h742rj6g4bq1hmq.apps.googleusercontent.com,
//     clientSecret: 9-EesLNcgmdhO6K0WydLYOVr,
//     callbackURL: "http://yourdormain:3000/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// fb strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: '159758891260669',
      clientSecret: 'aefff1a24cfb7d7721c30ebdf883a55e',
      callbackURL: 'https://qna-123.herokuapp.com/fbcallback',
      profileFields: ['id', 'emails', 'name']
    },
    fbVerify
  )
)

function fbVerify (accessToken, refreshToken, profile, next) {
User.findOne({fbId: profile.id}, function (err, user){
if (err) return res.send(err);

if(user){
console.log(user);
return next(null, user)
}
else{
  var newUser = new User({
    name: profile.name.givenName + ' ' + profile.name.familyName ,
    fbId: profile.id,
    email: profile.emails[0].value
  })
  // console.log(profile);

  newUser.save(function (err, fbUser) {
    return next(err, fbUser)
  })
}
})
}

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    localVerify
  )
)

// verify callback for local strategy
function localVerify (req, passportEmail, passportPassword, next) {
  User
  .findOne({
    email: passportEmail
  })
  .exec(function (err, foundUser) {
    if (err) {
      console.log('err', err)
      return next(err) // go to failureRedirect
    }

    if (foundUser&& foundUser.validPassword(passportPassword)) {
      // res.redirect('/')
      console.log('success, redirect to /profile')
      next(null, foundUser) // go to successRedirect
    } else{
      next()
    }
  })
}

module.exports = passport

import passport = require("passport");
require ('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const configLoginWithGoogle=()=>{

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_APP_REDIRECT_LOGIN,
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));
}
export default configLoginWithGoogle;
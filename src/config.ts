import LocalStrategy = require('passport-local');
import passport = require("passport");
/**
 * JWT config.
 */
export const jwt_config = {
  algorithms: ["HS256"],
  secret: "KIPHX9DyuVeMQsu4",
};
export const config_not_token = {
  secret: "KIPHX9DyuVeMQsu4",
  algorithms: ['HS256'],
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },

};


// config pssport
export const configPassport=()=>{
  passport.use(new LocalStrategy(function verify(username, password, cb) {
    // db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    //   if (err) { return cb(err); }
    //   if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
    //   crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    //     if (err) { return cb(err); }
    //     if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
    //       return cb(null, false, { message: 'Incorrect username or password.' });
    //     }
    //     return cb(null, row);
    //   });
    // });
  }));
}
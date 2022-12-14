const User = require("../models/User");
const { SECRET } = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};


module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await User.findById(payload.user_id).then(user => {
        if (user) {
          //Implement logger function/morgan
          return done(null, user)
        }
        //Implement logger function 
        return done(null, false)
      }).catch(() => {
        //Implement logger function
        return (null, false)
      });
    }));
};
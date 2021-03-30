const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("./model/User");

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};

passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "rajuCoder"
}, (payload, done) => {
    User.findById({_id : payload.sub}, (err, user) => {
        if(err)
            return done(err, false);
        if(user)
            return done(null, user);
        else
            return done(null, false);
    });
}));

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        // something went worng with database
        if(err) 
            return done(err);
        // if no user exist
        if(!user)
            return done(null, false);
        // check if password is correct or not
        user.comparePassword(password, done);
    });
}));
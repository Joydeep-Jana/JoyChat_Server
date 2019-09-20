const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStretagy = require('passport-local').Strategy;
const {ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config/keys');
const User = require('./models/user');

passport.use(new JwtStrategy(
{
    jwtFromRequest: ExtractJwt.fromHeader('authentication'),
    secretOrKey: JWT_SECRET  
}, async (payload, done) => 
{
    try 
    {
        const user = await User.findById(payload.sub);

        if (! user)
        {
            return done(null, false);
        }

        done(null, user);
    } catch (error) 
    {
        done(error, false)
    }
}));

passport.use(new LocalStretagy({
    usernameField: "email",
}, async (email, password, done)=>
{
    try
    {

        const user = await User.findOne({email});
    
        if (!user)
        {
            return done(null, false);
        }
    
        const isValid = await user.isValidPassword(password);
    
        if (!isValid)
        {
            return done(null, false);
        }
    
        done(null, user)
    }
    catch(error)
    {
        console.log(error);
        done(null, false);
    }
}));
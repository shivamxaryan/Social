const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy({
    //what will be the username of the user, so it is email from userSchema
    usernameField:'email',
    passReqToCallback:true
      
},
function(req,email,password,done){
    //find user establish identity
    User.findOne({email:email})
    .then(function(user){
        if(!user || user.password != password){
            req.flash('error','Invalid Username/Password');
            return done(null,false);
        }   
        return done(null,user);

    })
    .catch(function(err){
        req.flash('error',err)
        return done(err);
    })

    }
))

//when the user will return from the above it will come to the serializeUser part
//serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})



//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then(function(user){
        return done(null,user);
    })
    .catch(function(err){
        console.log('Error in finding user ---> passport');
        return done(err);
    })
})



//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is logged in then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();   //this says return to the next function in the line
    }

    //if the user is not authenticated
    return res.redirect('/users/log-in');
}

//set the user which is authenticated it will work as middleware.
passport.setAuthenticatedUser=function(req,res,next){
    //req.user contain the current siggned in user from the cookies so we are just sending it to locals for the view.
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports=passport;
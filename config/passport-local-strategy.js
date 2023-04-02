const passport=require('passport');
const LocalStrategy=require('passport-local');
const User = require('../models/user');


passport.use(new LocalStrategy({
    //what will be the username of the user, so it is email from userSchema
    usernameField:'email',
      
},
{
    function(email,password,done){
        //find user establish identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user ---> passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            
            return done(null,user);
        })
    }
}))

//when the user will return from the above it will come to the serializeUser part
//serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})



//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
          if(err){
            console.log('Error in finding user ---> passport');
            return done(err);
          }

          return done(null,user);
    })
})



//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is logged in then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not logged-in
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
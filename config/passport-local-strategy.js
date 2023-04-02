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


module.exports=passport;
const User = require('../models/user')

module.exports.profile = function (req, res) {
    User.findById(req.params.id)
    .then(function(user){
        return res.render('user_profile', {
        title: 'Users Profile',
        profile_users:user
    });
    })
    .catch(function(err){
        return res.redirect('back');
    })
    
}

//update the profile's input
module.exports.update=function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body)
        .then(function(user){
            return res.redirect('back');
        }).catch(function(err){
            return res.status();
        })
    }
}




//rendering Log in page
module.exports.logIn = function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_log_in', {
        title: 'Codial | Log In'
    });
}

//rendering Sing Up page
module.exports.signUp = function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Codial | Sign Up'
    });
}

//get sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })

        .then(function (user) {
            if (!user) {

                User.create(req.body)
                    .then(function (user) {
                        return res.redirect('/users/sign-up');
                    })
                    .catch(function (err) {
                        console.log("Error in creating the user");
                        return;
                    })


            } else {
                return res.redirect('back');
            }
        })

        .catch(function (err) {
            console.log("error in finding the email");
            return;
        });
}



//log in and create a session for user
module.exports.createSession = function (req, res) {
    req.flash('success','Successfully Logged In');
    return res.redirect('/');
}


//setting up sign-out 
module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
    req.flash('success','You are Successfully Logged Out');
    
    return res.redirect('/');
})
}


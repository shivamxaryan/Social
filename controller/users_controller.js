const User = require('../models/user')

module.exports.profile = function (req, res) {
    
     if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then(function(user){
            return res.render('user_profile',{
                title:'User LogIn',
                user:user
            });
        })
        .catch(function(err){
            return res.redirect('back');
        })
    }else{
        return res.redirect('back');
    }
    //aiudhsiuh

    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id, function(err,user){
    //         if(user){
    //         return res.render('user_profile',{
    //                        title:'User LogIn',
    //                        user:user
    //                    });
    //                 }    
    //     });
    // }else{
    //     return res.redirect('/users/log-in');
    // }
}




//rendering Log in page
module.exports.logIn = function (req, res) {
    return res.render('user_log_in', {
        title: 'Codial | Log In'
    });
}

//rendering Sing Up page
module.exports.signUp = function (req, res) {
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
                // User.create(req.body,function(err,user){
                //     if(err){
                //         console.log("Error in creating the user");
                //         return;
                //     }
                //     return res.redirect('/users/sign-up');
                // })

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
//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){
//             console.log('error in finding the user');
//             return;
//         }

//         if(!user){
//             User.create(req.body, function(err,user){
//                 if(err){
//                     console.log('error in creating the user');
//                     return;
//                 }
//                 return res.redirect('/users/sign-up');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     } );
// }






//log in and create a session for user
module.exports.createSession = function (req, res) {
    //Steps for authentication
    //Found the user
    User.findOne({email : req.body.email})
    .then(function(user){
        //handle user found
        if(user){
            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
    
            //handle session creation
            else{
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }
        }
        //handle user not found
        else{
            return res.redirect('back');
        }
    })
    
    .catch(function(err){
        console.log('Error in finding the user in log in');
        return;
    })
}
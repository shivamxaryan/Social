const User = require('../models/user')

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'Users Profile'
});
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
    //todo later
}
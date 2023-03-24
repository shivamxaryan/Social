const { model } = require("mongoose");

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'Users Profile'
    });
}


//rendering Log in page
module.exports.logIn=function(req,res){
    return res.render('user_log_in',{
        title:'Codial | Log In'
    });
}

//rendering Sing Up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Codial | Sign Up'
    });
}

//get sign up data
module.exports.create=function(req,res){
    //Todo later
}

//log in and create a session for user
module.exports.createSession=function(req,res){
    //todo later
}
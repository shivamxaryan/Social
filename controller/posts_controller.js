const User=require('../models/user');

module.exports.create=function(req,res){
    User.create({
        content:req.body.content,
        user:req.user._id
})
    .then(function(user){
        return res.redirect('back');
    })
    .catch(function(err){
        console.log('Error in creating the post');
        return;
    })
}
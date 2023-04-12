const Post = require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    Post.create({
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

module.exports.destroy=function(req,res){
    Post.findById(req.params.id)
    .then(function(post){
        if(post.user == req.user.id){                  // .id means converting the object id (ie ._id) in string.
            post.remove();

            Comment.deleteMany({post:req.params.id})
            .catch(function(err){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}
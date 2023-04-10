const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post)           // here post is the 'name' of the comment's input from home.ejs
    .then(function(post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })
            .then(function(comment){
                post.comments.push(comment);
                post.save();                     // save will save it in db otherwise it is in RAM

                res.redirect('/');
            })
            .catch(function(err){
                console.log('Error in saving the comment');
                return;
            })
        }
        else{
            console.log('error in finding the Post');
            return;
        }
    })
    .catch(function(err){
        console.log('Error in saving the comment1');
                return;
    })
}
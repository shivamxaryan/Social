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


module.exports.destroy=async function(req,res){
    // Comment.findById(req.params.id)
    // .then(function(comment){
    //     if(comment.user == req.user.id){
            
    //         let postId=comment.post;
    //         comment.remove();

    //         Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
    //         .then(function(post){
    //             return res.redirect('back');
    //         })
    //         .catch(function(err){
    //             return res.redirect('back');
    //         })
    //     }
    //     else{
    //         console.log('user is not authorised');
    //         return;
    //     }
    // })
    // .catch(function(err){
    //     console.log('error in deleting the comment');
    //     return res.redirect('back');
    // })

    try{
        const comment=await Comment.findById(req.params.id);
        if(comment.user == req.user.id) {
           
            let postId=comment.post;
            await comment.deleteOne();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
           
        }
        return res.redirect('back');

    }catch(error){
        return res.send({error:error,msg:'Somenthing went wrong in comment deleting!!'});
    }
    
}
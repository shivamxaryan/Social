const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
        .then(function (user) {
            return res.redirect('back');
        })
        .catch(function (err) {
            console.log('Error in creating the post');
            return;
        })
}

module.exports.destroy = async function (req, res) {
    // Post.findById(req.params.id)
    //         .then(function (post) {
    //             console.log('inside post');
    //             if (post.user == req.user.id) {                  // .id means converting the object id (ie ._id) in string.
    // console.log('inside if state');
    //                 post.deleteOne();

    //                 Comment.deleteMany({ post: req.params.id })
    //                     .catch(function (err) {
    //                         return res.redirect('back');
    //                     })
    //             }
    //             else {
    //                 return res.redirect('back');
    //             }
    //         })
    //         .catch(function(err){
    //             console.log('error in deleting the post');
    //             return res.redirect('back');
    //         })


    try {
        const post = await Post.findById(req.params.id);         //Post is of logged in user or not         
        if (post.user == req.user.id) {             
            await post.deleteOne();
            await Comment.deleteMany({ post: req.params.id });
            // await Like.deleteMany({likeable:post,onModel:'Post'});             
            // if (req.xhr) {
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     })
            // }
        }
        return res.redirect('back');
    } catch (error) {
        return res.send({ error: error, msg: 'Something went wrong!' });
    }

}
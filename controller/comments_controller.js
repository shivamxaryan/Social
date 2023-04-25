const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post)           // here post is the 'name' of the comment's input from home.ejs
        if (post) {
            try {
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })

                post.comments.push(comment);
                post.save();                                 // save will save it in db otherwise it is in RAM

                res.redirect('/');
            } catch (err) {
                console.log('Error in saving the comment');
                return;
            }
        }
        else {
            console.log('error in finding the Post');
            return;
        }
    } catch (err) {
        console.log('Error in saving the comment1');
        return;
    }
}




module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {

            let postId = comment.post;
            comment.deleteOne();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

        }
        return res.redirect('back');

    } catch (error) {
        return res.send({ error: error, msg: 'Somenthing went wrong in comment deleting!!' });
    }

}
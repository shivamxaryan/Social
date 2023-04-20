const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        req.flash('success','Post Created');
        return res.redirect('back');

    } catch (err) {
        req.flash('error',err);
        return;
    }

}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);           //Post is of logged in user or not 

        if (post.user == req.user.id) {                          // .id means converting the object id (ie ._id) in string.
            post.deleteOne();

            await Comment.deleteMany({ post: req.params.id });

            req.flash('success','Post and associated comments Deleted');
            return res.redirect('back');

        } else {
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }

    } catch (error) {
        req.flash('error',err);
        return res.redirect('back');
    }

}
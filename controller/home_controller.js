const Post=require('../models/post');

module.exports.home=function(req,res){

    Post.find({})
    .populate('user')
    .populate({                      // this is nested populating
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec({})
    .then(function(posts){
        return res.render('home',{
            title:'Social | Home',
            posts:posts
        });
    })
    .catch(function(err){
        console.log('error in showing posts lists');
    })
}
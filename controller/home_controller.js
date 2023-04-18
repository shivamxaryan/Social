const Post=require('../models/post');
const User=require('../models/user');

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
        User.find({})
        .then(function(users){
            return res.render(home,{
                title:Social|Home,
                posts:posts,
                all_users:users
        })    
    })
})
    .exec(function(err,posts){
        User.find({}, function(err,users){
            return res.render(home,{
                title:Social|Home,
                posts:posts,
                all_users:users
            })

        })
    })

    .catch(function(err){
        console.log('error in showing posts lists');
    })
}
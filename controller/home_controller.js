const Post=require('../models/post');
const User=require('../models/user');

module.exports.home=async function(req,res){
    try{
        let posts=await Post.find({})
    .populate('user')
    .populate({                      // this is nested populating
        path:'comments',
        populate:{
            path:'user'
        }
    });

    let users=await User.find({});
            return res.render('home',{
                title:'Social|Home',
                posts:posts,
                all_users:users
        });

    }catch(err){
        console.log('error in showing posts lists');
        return;
    }
}

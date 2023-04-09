const Post=require('../models/post');

module.exports.home=function(req,res){

    // console.log(req.cookies);
    // return res.render('home',{
    //     title:"Home"
    // });
   

    Post.find({}).populate('user').exec({})
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
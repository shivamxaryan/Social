const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,   //it will checks on the user (ObjectId is the unique no in studio3t)
        ref:'User'
    }
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;
const express=require('express');

const router=express.Router();

const userProfile=require('../controller/users_controller');
const userPost=require('../controller/post_controller');

router.get('/profile',userProfile.profile);
router.get('/post',userPost.posts);

module.exports=router;
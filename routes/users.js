const express=require('express');
const passport=require('passport');

const router=express.Router();

const userProfile=require('../controller/users_controller');
const userPost=require('../controller/post_controller');

router.get('/profile', passport.checkAuthentication ,userProfile.profile); 
router.get('/post',userPost.posts);
router.get('/log-in',userProfile.logIn);
router.get('/sign-up',userProfile.signUp);

router.post('/create',userProfile.create);
router.post('/create-Session',passport.authenticate(
    'local',
    {failureRedirect:'/users/log-in'})
    ,userProfile.createSession);

module.exports=router;
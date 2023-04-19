const express=require('express');
const passport=require('passport');

const router=express.Router();

const userProfile=require('../controller/users_controller');

router.get('/profile/:id', passport.checkAuthentication ,userProfile.profile); 
router.post('/update/:id',passport.checkAuthentication,userProfile.update);

router.get('/log-in',userProfile.logIn);
router.get('/sign-up',userProfile.signUp);

router.post('/create',userProfile.create);
router.post('/create-Session',passport.authenticate('local',{failureRedirect:'/users/log-in'}),userProfile.createSession);

router.get('/sign-out',userProfile.destroySession);


module.exports=router;
const express=require('express');
const router=express.Router();

const homeController=require('../controller/home_controller');

console.log('Router is working in Codial');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

module.exports=router;
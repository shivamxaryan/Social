const express=require('express');
const cookieParser= require('cookie-parser');
const path=require('path');
const port =8000;
const app=express();
const expressLayouts= require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'));
//extract style and script for sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);

//setting us view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error has been occured",err);
        return;
    }
    console.log("Server is running on Port:",port);
});
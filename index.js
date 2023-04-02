const express=require('express');
const cookieParser= require('cookie-parser');
const path=require('path');
const port =8000;
const app=express();
const expressLayouts= require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookies
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'));
//extract style and script for sub pages layout part
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);

//setting us view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Social',
    //todo later before deployment
    secret:'blahsomething',
    saveUninitialized:false,  // when a user is not logged in does session cookies have to save it, ofcourse not.
    resave:false,             // when a user has logged in and the data has been not changed then it should not resave it right.
    cookie : {
        maxAge:(1000*50*100)
}

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);  //this function will automatically called as a middleware


app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log("Error has been occured",err);
        return;
    }
    console.log("Server is running on Port:",port);
});
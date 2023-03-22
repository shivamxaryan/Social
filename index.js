const express=require('express');
const path=require('path');
const port =8000;
const app=express();
const expressLayouts= require('express-ejs-layouts');

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
// 1. Require All Packages

//i. Basic Pakages
if(process.env.NODE_ENV!='production'){
    const dotenv=require('dotenv').config();
}

console.log(process.env.MONGODB_URI);

const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const session=require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const flash=require('connect-flash');


const passport=require('passport');
const LocalStrategy=require('passport-local');

//ii. Require from routes
const listingRouter=require('./routes/listings.js');
const reviewRouter=require('./routes/reviews.js');
const userRouter=require('./routes/user.js');

//ii. Require things from utils
const asyncWrap=require('./utils/asyncWrap.js');
const ExpressError=require('./utils/ExpressError.js');

///iv. Require from models
const User=require('./models/User.js');


//2.Forming connection between server and mongo 
async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
}

main()
    .then(()=>{console.log('Mongo connected with server')})
    .catch((err)=>{console.log('Error in connecting mongo with server',err)});


//3. Configs

//Server Starting code
const app=express();

//i. Express middlewares (builtin)
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ii. Configs for ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));

//iii. Static Files configs
app.use(express.static(path.join(__dirname,'public')));

//iv. Config for method-override package
app.use(methodOverride('_method'));

//v ejs mate config
app.engine('ejs',ejsMate);

//vi. session configs

//mongo-connect used for storage of session info
const store=MongoStore.create({
    mongoUrl:process.env.MONGODB_URI,
    crypto:{
        secret:process.env.SESSION_SECRET
    },
    touchAfter:24*60*60// Refresh the session info after 1 day
})

store.on('error',(err)=>{console.log('Error in mongo session store',err)})

//Express-session option
const sessionOptions={
    store,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+(7*24*60*60*1000),
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}


//session middleware
app.use(session(sessionOptions));

//vii. Configs for Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//viii. Middleware for flash
app.use(flash());

//Making flash msg available to every ejs page
app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.warning=req.flash('warning');
    res.locals.error=req.flash('error');
    
    //Defining req.user inside locals so that ejs files can access it
    res.locals.currUser=req.user;

    // console.log(res.locals.success);
    next();
})



app.get('/',(req,res)=>{
    res.redirect('/listings');
})


//4. Route Mounting

//1. Routes Associted with /listings
app.use('/listings',listingRouter);

//2. Routes Associted with /listings/:id/reviews
app.use('/listings/:id/reviews',reviewRouter); //Imp->Listing id is mounted to parent router (Will not be passed to child router by default)

//3. Routes Associated with /user
app.use('/user',userRouter);

// 5.FALLBACK MIDDLEWARE
//Middleware to handle error for page Not found->404
app.use((req,res,next)=>{
    console.log(`404 hit: ${req.method} ${req.originalUrl}`);
    next(new ExpressError(404,'Page Not Found'));
})


// 6.ERROR HANDLING MIDDDLEWARE
app.use((err,req,res,next)=>{
    console.log(err);
    console.log(typeof err);

    // if(err.UserExistsError){
    //     let errMessage=err.UserExistsError;
    //     res.send('User already exits')
    // }

    // let {statusCode,errMessage}=err;

    res.render('error.ejs',{err});
    // res.status(err.status).send(err.message);
})

app.listen(8080,()=>{console.log('Server Listening on port 8080')});
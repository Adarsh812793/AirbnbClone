const mongoose=require('mongoose');
const User=require('../models/User');
const passport=require('passport');


module.exports.renderSignupForm=(req,res)=>{
    res.render('users/signup.ejs');
}

module.exports.signupUser=async (req,res) => {
    try{
            let {username,email,password}=req.body;

            const newUser=new User({username,email});

            let results=await User.register(newUser,password);

            //Automatocally login after signup
            req.login(newUser,(err)=>{
                if(err){
                    console.log(err);
                    next(err);
                }

                req.flash('success','Loged in succesfully');
                res.redirect('/listings');
            })
    }catch(e){
        console.log(e.message);
        req.flash('error',e.message);
        res.redirect('/user/signup');
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render('users/login.ejs');
}

module.exports.loginUser=async (req,res) => {
    req.flash('success','Logged in succesfully');
    let redirectUrl=res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){// if error occures while logging out
            console.log(err);
            return next(err);
        }
        req.flash('success','Logged Out Successfully');
        res.redirect('/listings');
    })
}
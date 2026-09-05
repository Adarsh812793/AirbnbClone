//1. Requiring Eveything that we need

//i.External packages
const express=require('express');
const mongoose=require('mongoose');

const passport = require('passport');


//ii.Require Models
const Listing=require('../models/Listing.js');
const Review=require('../models/Review.js');
const User=require('../models/User.js');


//iii.Require Things from utils
const asyncWrap=require('../utils/asyncWrap.js');
const ExpressError=require('../utils/ExpressError.js');

//iv
const saveOriginalUrl=require('../middleware.js').saveRedirectUrl;

//v. Require from controller
const userController=require('../controllers/userController.js');

//2. API routes associated with user

const router=express.Router();

//i.GET -> TO render a signup form
router.get('/signup',userController.renderSignupForm);

//ii. POST-> TO save the user and do stuff
router.post('/signup',asyncWrap(userController.signupUser))

//iii. GET-> Login form served
router.get('/login',userController.renderLoginForm);

//iv POST-> Verifying user credencials and logging him in ->passport does it using middleware
router.post('/login',saveOriginalUrl,passport.authenticate('local',{failureRedirect:'/user/login',failureFlash:true}),asyncWrap(userController.loginUser));

//v . Route to log out
router.get('/logout',userController.logoutUser);

module.exports=router; 

//1. Requiring Eveything that we need

//i.External packages
const express=require('express');
const mongoose=require('mongoose');


//ii.Require Models
const Listing=require('../models/Listing.js');
const Review=require('../models/Review.js');


//ii.Require Things from utils
const asyncWrap=require('../utils/asyncWrap.js');
const ExpressError=require('../utils/ExpressError.js');


//iv. Require ValidationScema //Jio Pacakage usage
const schemaValidate=require('../schemaValidate.js');

//v. Require from middleware

const isLoggedInForReview=require('../middleware.js').isLoggedInForReview;

//vi. Require things from Controller
const reviewController=require('../controllers/reviewController.js');

//2. Validation Middleware 
const reviewValidation=require('../middleware.js').reviewValidation;

//3. Routes associated with reviews

const router=express.Router({mergeParams:true});

//i POST -> To Create a review associated to that listing
router.post('/',isLoggedInForReview,reviewValidation,asyncWrap(reviewController.createReview));

//ii. DELETE -> To delete a specific review from a specific listing

router.delete('/:review_id',asyncWrap(reviewController.deleteReview));

module.exports=router;
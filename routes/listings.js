//Requiring Basic Packages
const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');

//Require Models
const Listing=require('../models/Listing.js');


//Require Things from utils
const asyncWrap=require('../utils/asyncWrap.js');
const ExpressError=require('../utils/ExpressError.js');

//Require middleware (custom for auth purpose)
const isLoggedIn=require('../middleware.js').isLoggedIn;
const isOwner=require('../middleware.js').isOwner;
const listingValidation=require('../middleware.js').listingValidation;
const addImageUrlFormCloud=require('../middleware.js').addImageUrlFromCloud;

//Require ValidationScema //Jio Pacakage usage
const schemaValidate=require('../schemaValidate.js');

//Require from controller
const listingController=require('../controllers/listingController.js');

//cloud related

const cloudStorage=require('../cloudConfig.js').storage;


const multer  = require('multer')
const upload = multer({ storage:cloudStorage})

//All routes associated with listings

const router=express.Router();

router
    .route('/')
    .get(asyncWrap(listingController.index))
    .post(isLoggedIn,upload.single('listing[image]'),addImageUrlFormCloud,listingValidation,asyncWrap(listingController.saveNewListing));

router.get('/new',isLoggedIn,listingController.renderNewForm);

router
    .route('/:id')
    .get(asyncWrap(listingController.showSingleListing))
    .patch(isLoggedIn,isOwner,upload.single('listing[image]'),addImageUrlFormCloud,listingValidation,asyncWrap(listingController.updateSingleListing))
    // .patch(upload.single('listing[image]'),addImageUrlFormCloud,(req,res)=>{
    //     console.log(req.file);
    //     console.log(req.body);
    //     res.send('Testing patch path');
    // })
    .delete(isLoggedIn,isOwner,asyncWrap(listingController.deleteSingleListing));



router.get('/:id/edit',isLoggedIn,asyncWrap(listingController.renderEditForm));

module.exports=router;
//1. Import packages
const passport=require('passport');

const Listing=require('./models/Listing')
const listingSchema=require('./schemaValidate').listingSchema;
const reviewSchema=require('./schemaValidate').reviewSchema;

const ExpressError=require('./utils/ExpressError');
//i. Function that checks if user has logged in or not
function isLoggedIn(req,res,next){

    if(!req.isAuthenticated()){ //if not logged in

        //Save the originalUrl to redirect after logging is completed
        req.session.redirectUrl=req.originalUrl;
        console.log(req.session.originalUrl);

        req.flash('warning','You must first log in');
        return res.redirect('/user/login');
    }
    next();
}

//ii. Function to save redirectUrl
function saveRedirectUrl(req,res,next){
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

//iii. Async function -> To check if he is the owner of listing that is being edited or deleted
async function isOwner(req,res,next) {

    // i. Find the id of the listing 
    let {id}=req.params;
    
    //ii.Find the listing that needes to be updated/deleted
    let listing_to_be_edited=await Listing.findById(id).populate('owner');

    //You must be first logged in 
    if(!res.locals.currUser){
        req.flash('error','You must first log in');
        return res.redirect('/user/login');
    }
   
    //You can only edit if you are that listing owner
    if(res.locals.currUser && !listing_to_be_edited.owner._id.equals(res.locals.currUser._id)){
        req.flash('error',`You dont have permission to edit this listing`);
        return res.redirect(`/listings/${id}`);
    }

    next();
}

//iv Validation Middleware
const listingValidation = function(req, res, next) {

    const result =listingSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(400, 'Enter Valid Listing');
    }

    next();
}

const reviewValidation=function(req,res,next){
    const result=reviewSchema.validate(req.body);
    
    if(result.error){
        throw new ExpressError(400,'Enter Valid Review Data');
    }else{
        next();
    }
}

//v.
function isLoggedInForReview(req, res, next) {

    if (!req.isAuthenticated()) { //If not looged in

        req.session.redirectUrl = `/listings/${req.params.id}`;

        req.flash('warning', 'You must first log in');

        return res.redirect('/user/login');
    }

    next();
}

//vi.
function addImageUrlFromCloud(req,res,next){
    //i.Get the image url from cludinary
    let image_url=req.file.path;

    //ii.Add it in req.body.listing obj
    req.body.listing.image=image_url;

    next();
}

module.exports={isLoggedIn,isLoggedInForReview,saveRedirectUrl,isOwner,listingValidation,reviewValidation,addImageUrlFromCloud};
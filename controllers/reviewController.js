const mongoose=require('mongoose');
const Review=require('../models/Review');

module.exports.createReview=async(req,res)=>{

    //Step 01:Find the Listing by id
    const listing=await Listing.findById(req.params.id);

    //Step 02: Create a new review
    const newReview=new Review(req.body.review);

    //Step 03:Add the owner of this review
    newReview.created_by=res.locals.currUser._id;

    //Step 04: Link between Listing and Review
    listing.reviews.push(newReview);


    // Step 05: Save to db
    await newReview.save();
    await listing.save();
    
    res.redirect(`/listings/${listing._id}`);
     
}

module.exports.deleteReview=async(req,res)=>{
    console.log(req.params);

    //i. Deconstruct and get id and review_id
    const {id,review_id}=req.params;

    //ii. DB operations
    const result1=await Listing.findByIdAndUpdate(id,{$pull:{reviews:review_id}});
    console.log(result1);

    const result2=await Review.findByIdAndDelete(review_id)
    console.log(result2);

    res.redirect(`/listings/${id}`);
}
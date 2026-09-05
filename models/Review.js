const { required } = require('joi');
const mongoose=require('mongoose');


//Creating Schema for Review
const reviewSchema=mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


//Creating review model
const Review=mongoose.model('Review',reviewSchema);

module.exports=Review;
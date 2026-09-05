const mongoose=require('mongoose');

const Review=require('./Review.js');

const link='https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

//Creating listingSchema
const listingSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        default:link,
        set: (v)=>v===""?link:v,
        required:true
    },

    price:{
        type:Number,
        required:true,
        min:0
    },

    location:{
        type:String,
        required:true
    },

    geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
    },

    country:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    },

    //Reference of Reviews
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

//Mongoose middlewares
listingSchema.post('findOneAndDelete',async(listing)=>{
    //Also delete all the reviews associated with that listing
    await Review.deleteMany({_id:{$in:listing.reviews}})
})


const Listing=mongoose.model('Listing',listingSchema);

module.exports=Listing;
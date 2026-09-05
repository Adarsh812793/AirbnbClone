const mongoose=require('mongoose');
const Listing=require('../models/Listing')

const ExpressError=require('../utils/ExpressError');
const geocodeLocation=require('../utils/geocoder')

//i. index->To display all listings
module.exports.index=async(req,res)=>{
    let allListings=await Listing.find({});
    res.render('listings/index.ejs',{allListings});
}

//ii.
module.exports.renderNewForm=(req,res)=>{
    res.render('listings/new.ejs');
}

//iii.
module.exports.showSingleListing=async(req,res)=>{
    let {id} = req.params;
    // .populate('reviews') swaps each review ObjectId in listing.reviews
    // for the actual Review document, so we can render review.comment etc.

    if (!mongoose.Types.ObjectId.isValid(id)) { //TO check if id is valid
    throw new ExpressError(404, 'Page Not Found');
    }   

    let listing = await Listing.findById(id).populate('reviews').populate('owner');

    res.render('listings/show.ejs',{listing});
}

//iv.
module.exports.saveNewListing = async (req, res) => {

    //API call to fetch co-ordinates based on lacation entered
    const coordinates = await geocodeLocation(
        req.body.listing.location
    );

    if (!coordinates) {
        throw new ExpressError(400, "Location could not be found");
    }

    let newListing = new Listing(req.body.listing);

    newListing.geometry = {
        type: "Point",
        coordinates: [
            coordinates.longitude,
            coordinates.latitude
        ]
    };

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash('success', 'New Listing Created');
    res.redirect('/listings');
};

//v.
module.exports.renderEditForm=async(req,res)=>{

    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render('listings/edit.ejs',{listing});
}

//vi.
module.exports.updateSingleListing=async(req,res)=>{

    let id=req.params.id;
    //Directly update the listing after validation and authorisation
    await Listing.findByIdAndUpdate(id,{...req.body.listing});

    req.flash('success','Listing has been edited'); //Flash message
    res.redirect(`/listings/${id}`);
}

//vii.
module.exports.deleteSingleListing=async(req,res)=>{
    
    let {id}=req.params;

    await Listing.findByIdAndDelete(id);//Findind a listing having that id
    
    req.flash("success", "Listing deleted successfully!");

    res.redirect('/listings');
}
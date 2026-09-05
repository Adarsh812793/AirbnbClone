//Require packages
const mongoose=require('mongoose');
const passportLocalMongooseobj=require('passport-local-mongoose');
const passportLocalMongoose=passportLocalMongooseobj.default;


//Defining a User Schema
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    }
});

//Add plugin to schema -> automatically adds username and passport fields in schema
userSchema.plugin(passportLocalMongoose);

//Create the user model
const User=mongoose.model('User',userSchema);

module.exports=User;
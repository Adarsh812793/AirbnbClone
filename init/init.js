const mongoose=require('mongoose');

const init=require('./data.js');
const Listing=require( "../models/Listing.js");

//Forming connection between server and mongo 
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

main()
    .then(async()=>{
        console.log('Mongo connected with server')
        await initdb();
    })
    .catch((err)=>{'Error in connecting mongo with server'});

//Inserting bulk data 
async function initdb() {
    await Listing.deleteMany({});
    init.data=init.data.map((obj)=>({...obj,owner:'6a8d40af8a81a1b298635006'}));
    await Listing.insertMany(init.data);
    console.log('Data was initialized');
}


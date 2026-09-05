//Creating a async Wrap function->TO execute asyncronous functions
//fn ->asynchrounous function
function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next)
            .catch(next); // If promise is rejected then call next(err)-> goes to error handler middleware
    }
}

module.exports=asyncWrap;
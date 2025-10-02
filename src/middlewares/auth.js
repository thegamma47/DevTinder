const { findById } = require("../models/user");

const userAuth = async(req,res,next)=>{
   // Read the token from the req cookies
    try{const {token}=req.cookies;
    if(!token){
        throw new Error("token is not valid")
    }
  // Validate the token 
    const decodedObj = await Jwt.varify(token,"thegamma@7380");
  // Find  the user
    const {_id} = decodedObj;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found ")
    }
        req.user = user;
    next();}catch(err){
    console.error(err.stack);
    res.status(500).send("Something went wrong");
}};

module.exports = {
    adminAuth,
    userAuth,    
};
const express= require ('express');
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");

app.post("/signup",async(req,res)=>{
    const user = new User({
        firstName: "the",
        lastName: "Gamma",
        email: "thegamma551@gmail.com",
        password: "gamma@123"

    });
    await user.save();
    res.send("user signed up in successfully!")


});

connectDB().then(()=>{
    console.log("database connected successfully");
    app.listen(7866,()=>{
    console.log('Server is running on port 7866');
})
}).catch((err)=>{
    console.log("database cannot be connected");
});



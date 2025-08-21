const express= require ('express');
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");

app.use(express.json());

app.post("/signup",async(req,res)=>{
   
    const user = new User(req.body);

     try{
    await user.save();
    res.send("user signed up in successfully!")
}catch(err){
        console.error("Signup error:", err.message);
    res.status(500).send("Something went wrong");
}

});

connectDB().then(()=>{
    console.log("database connected successfully");
    app.listen(7866,()=>{
    console.log('Server is running on port 7866');
})
}).catch((err)=>{
    console.log("database cannot be connected");
});



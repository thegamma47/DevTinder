const express= require ('express');
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");

app.use(express.json());

//signup route

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

// Get user by email or find user by email

app.get("/user/:emailId",async(req,res)=>{
    const userEmail=req.params.emailId;

    try{
        const user=await user.findOne({emailId:userEmail})
            if(!user){
                 res.status(404).send("user not found")
                }else{
                    res.send(user);
                }

        
    }catch(err){

    }

    // try{
        // const users=await User.find({emailId:userEmail})
        // if(users.length===0){
            // res.status(404).send("user not found")
        // }else{
            // res.send(users);
        // }
    // }catch(err){
        // res.status(400).send("something went wrong")
    // }

});
// Feed API - GET/feed -gat all user from database
app.get("/feed",async(req,res)=>{
    try{
        const user=await user.find({});
    }catch(err){
                res.status(400).send("something went wrong")
    }
});

//delete a user from the database

app.delete("/user/:id",async(req,res)=>{
    const userId=req.params.Id;
    try{
        const userId=await userfindByIdAndDelete(userId);
        res.send("user deleted successfully")
    }catch(err){
        res.status(400).send("something went wrong")
    }
});

//update data of the user

app.patch("/user/:userid",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES=["skills","photoUrl","age","gender","about"]
        const isupdateAllowed= Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
        );
        if(!isupdateAllowed){
            throw new Error("update not allowed")
        }
        await user.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true,})
        res.send("user updated successfully")
    }catch(err){
        res.status(400).send("something went wrong")
    }

})


connectDB().then(()=>{
    console.log("database connected successfully");
    app.listen(7866,()=>{
    console.log('Server is running on port 7866');
})
}).catch((err)=>{
    console.log("database cannot be connected");
});



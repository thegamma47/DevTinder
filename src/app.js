const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

//signup route

app.post("/signup", async (req, res) => {
  //validation of the data
  try {
    validateSignUpData(req);

    const { firstName, lastName, email,skills, password } = req.body;

    //encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)
    //creating a new instance of the user model

    const user = new User({
      firstName,
      lastName,
      email,
      skills,
      password: passwordHash,
    });

    await user.save();
    res.send("user signed up in successfully!");
  } catch (err) {
   console.error(err.stack);
    res.status(500).send("Something went wrong");
  }
});

//create a login API

app.post("/login",async(req,res)=>{

  try{
      const {email,password}=req.body;
      
      const user = await User.findOne({email: email});
      if(!user){
        throw new Error ("Invalid Credentials");
      }

      const isPasswordValid= await bcrypt.compare(password,user.password)
        
      if(isPasswordValid){
        res.send("user logged In succesfully")
      }else{
        throw new Error("Invalid Credentials")
      }
  } catch (err) {
   console.error(err.stack);
    res.status(500).send("Something went wrong");
  }
});

// Get user by email or find user by email

app.get("/user/:emailId", async (req, res) => {
  const userEmail = req.params.emailId;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {console.error(err.stack);
    res.status(500).send("Something went wrong while fetching user");}

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

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(users);
  } catch (err) {
    console.error(err.stack);
    res.status(400).send("something went wrong");
  }
});

//delete a user from the database

app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    console.error(err.stack);
    res.status(400).send("something went wrong");
  }
});

//update data of the user

app.patch("/user/:userid", async (req, res) => {
  const userId = req.params.userid;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["skills", "photoUrl", "age", "gender", "about"];
    const isupdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isupdateAllowed) {
      throw new Error("update not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    console.error(err.stack);
    res.status(400).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(7866, () => {
      console.log("Server is running on port 7866");
    });
  })
  .catch((err) => {
    console.log("database cannot be connected");
  });

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser= require("cookie-parser");
const jwt = require("jsonwebtoken");
const{userAuth} = require("./middlewares/auth")



app.use(express.json());
app.use(cookieParser());

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
        // create a jwt token
        const token =  await jwt.sign({_id: user._id},"thegamma@7380")
        console.log(token)

        // add the token to the cookie and send the response back to the user
        res.cookie("token",token);

        res.send("user logged In succesfully")
      }else{
        throw new Error("Invalid Credentials")
      }
  } catch (err) {
   console.error(err.stack);
    res.status(500).send("Something went wrong");
  }
});

app.get("/profile",userAuth,async(req,res)=>{
try{

res.send("user");
}
catch(err){
  console.error(err.stack);
    res.status(500).send("Something went wrong");
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

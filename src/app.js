const express= require ('express');

const app = express();

app.get("/user",(req,res,next)=>{
    next();
    res.send("response1")
    console.log("got the answer")
    
},
app.get("/user",(req,res,next)=>{
    next();
    res.send("response2")
    console.log("got the answer 2")
},

app.get("/user",(req,res,next)=>{
    next();
    res.send("response3")
    console.log("got the answer 3")
},

app.get("/user",(req,res,next)=>{
    next();
    res.send("response4")
    console.log("got the answer 4")
},

app.get("/user",(req,res,next)=>{
    next();
    res.send("response5")
    console.log("got the answer 5")
},
app.get("/user",(req,res,next)=>{
    res.send("response6")
    console.log("got the answer 6")
}

))))));




app.listen(7866,()=>{
    console.log('Server is running on port 7866');
})
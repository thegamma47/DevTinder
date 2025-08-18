const express= require ('express');

const app = express();

const {adminAuth,userAuth}=require ("./middlewares/auth")

app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
        res.send("user data send");

});
app.get("/admin/getAllData",(req,res)=>{
        res.send("all the data");

});

app.get("/admin/deleteUser",(req,res)=>{
        res.send("user deleted");

});



app.listen(7866,()=>{
    console.log('Server is running on port 7866');
})
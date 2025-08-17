const express= require ('express');

const app = express();

app.use("/admin",(req,res)=>{
    const token="xyz";
    const isAdminAuthorized=token="xyz";
    if(!isAdminAuthorized){
        res.status(404).send("unAuthorized request");
    } else{
        next();
    }

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
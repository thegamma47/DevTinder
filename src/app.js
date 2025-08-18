const express= require ('express');

const app = express();



app.get("/user",userAuth,(req,res)=>{
    try{
    throw new error("abhay is gamma")
        res.send("user data send");
}catch(err){
    res.status(500).send("something went wrong2")
}
}
);

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})

app.listen(7866,()=>{
    console.log('Server is running on port 7866');
})
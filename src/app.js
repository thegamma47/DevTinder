const express= require ('express');

const app = express();

app.use("/test",(req,res)=>{
    res.send('Hello, World!');

});


app.listen(7866,()=>{
    console.log('Server is running on port 7866');
})
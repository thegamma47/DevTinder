const express= require ('express');

const app = express();

//This will only handel  get method for /user
app.get("/user", (req,res) =>{
    res.send({firstName:"Gamma",lastName:"rajpoot"});
});


app.post("/user",(req,res)=>{
    res.send("data sucessfully saved in the data base");
});

app.delete("/user",(req,res)=>{
    res.send("data sucessfully deleted from the data base");
});

//This will match all the http methords for /test
app.use("/test",(req,res)=>{
    res.send('mic testing 123 ');

});




app.listen(7866,()=>{
    console.log('Server is running on port 7866');
})
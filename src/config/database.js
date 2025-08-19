const mongoose =require("mongoose");

const connectDB= async()=>{
mongoose.connect("mongodb+srv://thegamma551:lHb2uUdDDqITZIL2@cluster01.jrvuwzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01");
};

module.exports=connectDB;

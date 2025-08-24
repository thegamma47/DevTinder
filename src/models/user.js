const mongoose=require('mongoose');

const validator=require('validator')

const userSchema=mongoose.Schema({
    firstName: {
        type:String,
        required:true,
    },
    lastName: {
        type:String,
    },
    age :{
        type:Number,
    },
    gender:{
        type:String,
         enum: ["male", "female", "other"],
           required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address: + value")
            }
        },
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
    },
    skills:{
        type:{String},
    },


});

module.exports=mongoose.model("User",userSchema)
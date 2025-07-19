const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required: true,
        minLength:3,
        maxLength: 20,
    },
    lastName :{
        type: String,
    },
    email :{
        type:String,
        required: true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:" + value);
            }
        }
    },
    password :{
        type:String,
    },
    age :{
        type:Number,
        min: 18,
    },
    gender :{
        type:String,
        enum:{
            values:["male", "female", "other"],
            message: '{VALUE} is not a valid gender type',
        },
    },
    photoUrl:{
        type:String,  
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    about :{
        type:String, 
        default: "Hey there! I'm sushant",
    },   
    skills :{
        type:[String],
    },
},
{ 
    timestamps: true,  
}
     
);

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({ _id: user._id },"devtindersecret" 
    );
    return token;
};

userSchema.methods.validatepassword = async function(passwordinputbyuser){
    const user = this;
    const passwordhash = user.password;

    const ispassvalid =  bcrypt.compare(passwordinputbyuser, passwordhash);

    return ispassvalid;
}

module.exports = mongoose.model("User", userSchema);

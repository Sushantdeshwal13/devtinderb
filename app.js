const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
require("dotenv").config(); 
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


const authRouter = require("./Routes/auth.js");
const profileRouter = require("./Routes/profile.js");   
const requestRouter = require("./Routes/conrequest.js");
const userRouter = require("./Routes/user.js")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



app.get("/feed", async (req,res)=>{
    const useremail = req.query.email;
    try{
        const users = await User.findOne({email: useremail});
        if(!users){
            res.status(404).send("No users found with the provided email");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(500).send("Error fetching users: " + err.message);   
    }
})

connectDB()
.then(()=>{
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 7777");
});
})
.catch((error)=>{
    console.error("MongoDB connection failed:", error);
});
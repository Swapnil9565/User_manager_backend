import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/userDb");
const userSchema=mongoose.Schema({
    username:String,
    email:String,
    userImgUrl:String
})

export const userModel=mongoose.model("user",userSchema);



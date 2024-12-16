import express, { urlencoded } from 'express';
import { userModel } from './models/user.js';
const app = express();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",async (req,res)=>{
    res.render("index");
    res.end();
})
app.post("/create",async (req,res)=>{
  const {username,email,userImgUrl}=req.body;
  await userModel.create({
    username,
    email,
   userImgUrl
  })
  res.redirect("/users");
  console.log("User Created Successfully...");
})
app.get("/users",async (req,res)=>{
  const users=await userModel.find();
  res.render("userInfo",{users});
})
app.get("/edit/:id", async (req,res)=>{
  const userId=req.params.id;
  const users=await userModel.findOne({_id:userId});
  res.render("editPage",{users,userId});
 
})
app.post("/update/:id",async (req,res)=>{
  const {prevUsername,prevEmail,preUserImgUrl}=req.body;
  const userId=req.params.id;
  const updatedUser=await userModel.updateOne({_id:userId},{$set:{username:prevUsername,email:prevEmail,userImgUrl:preUserImgUrl}});
  res.redirect("/users");
  console.log("Updated user",updatedUser);

})
app.get("/delete/:id",async (req,res)=>{
  const userId=req.params.id;
  const deletedUser= await userModel.deleteOne({_id:userId});
  res.redirect("/users");
  console.log("Deleted Documents",deletedUser);
})

app.listen(3000,()=>{
  console.log("Server Running....");
})


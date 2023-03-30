const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const collection = require("./mongodb")
const path = require("path")


// app.set("view engine","ejs")


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const app = express();
app.use(express.json())

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = []; 
// add below
app.use(express.urlencoded({extended:false}))

app.get("/",function(req , res){
  res.render("login")
})

app.get("/signup",function(req,res){
  res.render("signup")
})

app.post("/signup", async (req,res)=>{
  const data={
    email:req.body.email,
    password:req.body.password,
    role:req.body.role
  }
  await collection.insertMany([data])
  const references = {startingContent:homeStartingContent ,
    posts:posts,
    role:data.role}
  res.render("home" , references);
})

app.post("/login", async (req,res)=>{
  
  try{
    const check=await collection.findOne({email:req.body.email})
    if(check.password === req.body.password){
      console.log(check)
      const references = {startingContent:homeStartingContent ,
        posts:posts,
        role:check.role}
      res.render("home" ,references);
    }
    else{
      res.send("Wrong password")
    }
   
  }
  catch{
    res.send("wrong details")
  }
  
  
})

app.listen(3000, function() {
    console.log("Server started on port 3000 and Port connected");
  });
  

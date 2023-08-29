const express = require('express');
let books = require("./booksdb.js");
const mongoose=require('mongoose')
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users; 
const User= require('../model/user')
const public_users = express.Router();
const jwt=require('jsonwebtoken')
const Book= require('../model/book')

public_users.post("/register", async (req,res) => {
  //Write your code here
  const username= req.body.username;
  const password=req.body.password;
try{
const user= await User.create({
  username:username,
  password:password

 })

}catch(error){
  if (error instanceof mongoose.Error.ValidationError) {
    return res
      .status(400)
      .send({ error: "Validation error", message: error.message });
  }

  if (error.code === 11000 && error.keyPattern && error.keyValue) {
    console.error(
      `Duplicate key error. username '${error.keyValue.username}' already exists.`
    );
    return res.status(500).json({ error:  `Duplicate key error. username '${error.keyValue.username}' already exists.`});
  } else {
    console.error("An error occurred:", error);

    return res.status(500).json({ error: "An error occurred" });
  }

}


//res.status(300).json({message:user})
});

// Get the book list available in the shop
public_users.get('/',async(req, res) =>{
  //Write your code here
const book= await Book.find({})
      return res.status(300).json({books: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) =>{
  //Write your code here
  const isbn= req.params.isbn

try{
const book= await Book.findOne({isbn:isbn})
return res.status(200).json(book)
}catch(error){
  return res.status(400).json({message: error});
}
  
 });
  
// Get book details based on author
public_users.get('/author/:author',async(req, res)=> {
  //Write your code here
const author=req.params.author;
try{
  const book= await Book.findOne({author:author})
  return res.status(200).json(book)
  }catch(error){
    return res.status(400).json({message: error});
  }
});

// Get all books based on title
public_users.get('/title/:title',async(req, res)=> {
  //Write your code here
  const title=req.params.title;
  try{
    const book= await Book.findOne({title:title})
    return res.status(200).json(book)
    }catch(error){
      return res.status(400).json({message: error});
    }
});


//  Get book review
public_users.get('/review/:isbn',async (req, res)=> {
  //Write your code here
  const isbn= req.params.isbn

  
  try{
    const book= await Book.findOne({isbn:isbn})
    const review=book.review
    return res.status(200).json(review)
    }catch(error){
      return res.status(400).json({message: error});
    }
});




module.exports.general = public_users;

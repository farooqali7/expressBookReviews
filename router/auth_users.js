const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const User= require('../model/user')
const Book=require('../model/book')
const secretkey='secretkey'
let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", async(req,res) => {
  //Write your code here
  const username= req.body.username;
  const password=req.body.password;
  console.log(username)
try{
const user= await User.findOne({
  username:username,
  password:password

 })
 const token=jwt.sign({username:username, password:password}, secretkey)
 res.status(300).json({jwtToken:token})
}catch(error){
  
console.log(error)
    return res.status(500).json({ error: error});
  

}

});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const t = req.headers.authorization;
    const f = t.split(" ");
    const token = f[1];
    console.log(token);
    console.log(isbn);
    const user = jwt.verify(token, secretkey);
    console.log(user);

    const username = user.username;
    const password = user.password;
    const text = req.body.review;
    const uuser = await User.findOne({ username: username, password: password });
    const user_id = uuser._id;
    const newReview = {
      text: text,
      reviewer: user_id,
    };
    
    // Use $push to add the new review to the existing reviews array
    const updatedBook = await Book.findOneAndUpdate(
      { isbn: isbn },
      { $push: { review: newReview } },
      { new: true } // Return the updated document
    );
    
    console.log(updatedBook);
    return res.status(200).send({ msg: updatedBook });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});



regd_users.delete("/auth/review/:isbn", async(req, res) => {
  try {
    const isbn = req.params.isbn;
    const t = req.headers.authorization;
    const f = t.split(" ");
    const token = f[1];
    console.log(token);
    console.log(isbn);
    const user = jwt.verify(token, secretkey);
    console.log(user);

    const username = user.username;
    const password = user.password;
    const text = req.body.review;
    const uuser = await User.findOne({ username: username, password: password });
    const user_id = uuser._id;
  
    
    // Use $push to add the new review to the existing reviews array
    const updatedBook = await Book.findOneAndUpdate(
      { isbn: isbn },
      { $pull: { review:{reviewer:user_id} } },
      { new: true } // Return the updated document
    );
    
    console.log(updatedBook);
    return res.status(200).send({ msg: updatedBook });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
)

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

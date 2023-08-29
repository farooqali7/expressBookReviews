const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/bookreview')
.then(()=>{
    console.log('mongodb connected')
})
.catch((err)=>console.log(err))

const app = express();
app.use(express.urlencoded({extends:false}))
app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
next()
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running at port number",PORT));

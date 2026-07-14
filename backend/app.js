// Configure express and middleware

//import pkgs
//create express app
//         cilent => app => route => response 
//configure middleware
//middleware is the function that runs between req and res.
//      Req => Middleware => Route => Res
//export the app

const express = require("express");
const app = express();

const auth = require("./routes/auth");

const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", auth);


module.exports=app
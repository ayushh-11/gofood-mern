const express = require("express");
const cors = require("cors");
const app = express();
const session = require('express-session');
const mongoDB = require('./db');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginUser")
const index = require("./routes/displatData");
const logout = require("./routes/logout");
const cart = require("./routes/cart");
const cartapi = require("./routes/cartapi");
const order = require("./routes/order");
const viewOrder = require("./routes/viewOrder");


app.use(cors({
    origin: process.env.origin,
    credentials: true 
}));
app.use(express.json());


////start session
app.use(session({
    name : 'app.sid',
    secret: "1234567890QWERTY",
    resave: true,
    saveUninitialized: true
}));

///////mongodb connection
mongoDB();
app.use("/", createUser);
app.use("/", loginUser);
app.use("/", index);
app.use("/", logout);
app.use("/", cart);
app.use("/", cartapi);
app.use("/", order);
app.use("/", viewOrder);

app.get("/", (req, res) =>{
    res.send("Hello world")
})

app.listen(process.env.port,()=>{
    console.log("Server started")
})
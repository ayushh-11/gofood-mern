const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const loginModel = require("../models/loginModel.js");
const bcrypt = require("bcrypt");

router.post("/createUser",(req, res) => {
    const {name, email, password,address} = req.body;
    
    console.log("Name ========> "+name);
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        loginModel.create({
            name : name,
            email : email,
            password : hash,
            location : address
        })
        .then(result => {
            res.json(result)
        })
        .catch(error => console.log(error));
    })
    
})

module.exports = router;
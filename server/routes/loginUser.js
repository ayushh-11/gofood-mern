const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const loginModel = require("../models/loginModel.js");
const bcrypt = require("bcrypt");
const session = require('express-session');
app.use(session({
    name : 'app.sid',
    secret: "1234567890QWERTY",
    resave: true,
    saveUninitialized: true
}));

router.post("/login",(req, res) => {
    const {email, password} = req.body;
    
    loginModel.findOne({
        email : email
    })
    .then(result=>{
        if(result){
            bcrypt.compare(password, result.password, (err, bcryptResult)=>{
                if(bcryptResult){
                    req.session.auth = true;
                    global.email = email;
                    res.json({message:"success"});
                }
                else{
                    res.json({message:"password"});
                }
            })
        }
        else
            res.json({message:"email"});

    })

})

module.exports = router;
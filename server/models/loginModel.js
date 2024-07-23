const mongoose = require("mongoose");

loginSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    location : String,
})

LoginModel = mongoose.model("login", loginSchema);

module.exports = LoginModel;
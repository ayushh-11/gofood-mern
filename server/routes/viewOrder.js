const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const OrderModel = require("../models/ordermodel.js");

router.get("/order",(req, res) => {
    console.log("getting orders")
    OrderModel.find({
        email:global.email
    })
    .then(result => {
        console.log(result)
        res.json(result);
    })
    .catch(err => {
        throw err;
    }) 
    
})

module.exports = router;
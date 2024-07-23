const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const OrderModel = require("../models/ordermodel.js");

router.post("/order",(req, res) => {
    
    OrderModel.insertMany(req.body)
    .then(result => {
        res.json("order success");
    })
    .catch(err => {
        throw err;
    }) 
})

module.exports = router;
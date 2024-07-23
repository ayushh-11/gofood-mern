const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/cart", (req,res) => {
    data = req.body;
    cartArray = req.session.data ||[]
    cartArray.push(data);
    req.session.data = cartArray;
    res.json(req.session.data);
})

module.exports = router;
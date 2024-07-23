const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/cart", (req,res) => {
    cartArray = req.session.data ||[]
    res.json(req.session.data);
})

module.exports = router;
const express = require("express");
const router = express.Router();
const app = express();

router.get("/index", (req,res) => {
    console.log(global.email)
    if (req.session.auth === true)
        res.json([global.food_items, global.food_category, true]);
    else
        res.json([global.food_items, global.food_category, false]);
})

module.exports = router;
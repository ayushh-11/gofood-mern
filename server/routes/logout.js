const express = require("express");
const session = require("express-session");
const router = express.Router();
const app = express();

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err)
            throw err;
        else
            res.json("logout");
    })
})

module.exports = router;

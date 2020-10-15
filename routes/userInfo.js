var express = require('express');
var router = express.Router();

const db = require("../db/database.js");

router.get("/:email", (req, res) => {
    db.get("SELECT * FROM Users WHERE Email = ?",
    req.params.email,
    (err, userInfo) => {
        res.json(userInfo);
    })
});

module.exports = router;

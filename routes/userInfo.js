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

router.get("/inventory/:email", (req, res) => {
    db.all("SELECT UserEmail, ObjectName, SUM(ObjectAmount) as ObjectAmount FROM UserObjects WHERE UserEmail = ? GROUP BY ObjectName",
    req.params.email,
    (err, userInventory) => {
        res.json(userInventory);
    })
});

module.exports = router;

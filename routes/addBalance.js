var express = require('express');
var router = express.Router();

//JSON Web Tokens
const jwt = require('jsonwebtoken');

const db = require("../db/database.js");

router.post("/:email",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => {
        var addBalance = req.body.addBalance;
        var email = req.params.email;
        db.get("SELECT Balance FROM Users WHERE Email = ?",
        email,
        (err, userInfo) => {
        var balance = userInfo.Balance + parseInt(addBalance);
        db.run("UPDATE Users SET Balance = ? WHERE Email = ?",
        balance,
        email,
            (err) => {
                if (err) {
                    res.status(401).json({
                        data: {
                            status: 400,
                            error: 'Error'
                        }
                    });
                } else {
                    res.status(200).json({
                        data: {
                            status: 200,
                            msg: 'Balance updated'
                        }
                    });
                }
            })
            })
});

function checkToken(req, res, next) {
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, function(err) {
        if (err) {
            // send error response
            res.json({
                data: {
                    type: "token-error",
                    error: "Invalid token",
                }
            });
        } else {
            // Valid token send on the request
            next();
        }
    });
}

module.exports = router;

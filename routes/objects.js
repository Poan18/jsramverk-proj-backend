var express = require('express');
var router = express.Router();

//JSON Web Tokens
const jwt = require('jsonwebtoken');

const db = require("../db/database.js");

router.get("/", (req, res) => {
    db.all("SELECT * FROM Objects",
    (err, objectInfo) => {
        res.json(objectInfo);
    })
});

router.get("/:name", (req, res) => {
    db.get("SELECT * FROM Objects WHERE Name = ?",
    req.params.name,
    (err, objectInfo) => {
        res.json(objectInfo);
    })
});

router.post("/buy/:name",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => {
    var animalName = req.params.name;
    var amount = req.body.amount;
    var email = req.body.email;
    var oldBalance = 0;
    var newBalance = 0;
    var price = 0;

    db.serialize(function() {

        var enough = true;

        db.get("SELECT Price FROM Objects WHERE Name = ?",
        animalName,
        (err, objectPrice) => {
            price = objectPrice.Price;
        })

        db.get("SELECT Balance FROM Users WHERE Email = ?",
        email,
        (err, userBalance) => {
            oldBalance = userBalance.Balance;
            newBalance = oldBalance - (amount*price);

            if (newBalance < 0) {
                enough = false;
                return
            }

            db.run("UPDATE Users SET Balance = ? WHERE Email = ?",
            newBalance,
            email,
                (err) => {
                    if (err) {
                        console.error(err);
                    }
                })

        })

        db.get("SELECT ObjectAmount FROM UserObjects WHERE UserEmail = ? AND ObjectName = ?",
        email,
        animalName,
        (err, objectInfo) => {
            if (enough != true) {
                res.json({
                    data: {
                        status: 400,
                        msg: 'Not enough balance.'
                    }
                })
                return
            }
            if (objectInfo) {
                // UPDATE if user already has these objects
                var newAmount = objectInfo.ObjectAmount + parseInt(amount);

                db.run("UPDATE UserObjects SET ObjectAmount = ? WHERE UserEmail = ? AND ObjectName = ?",
                newAmount,
                email,
                animalName,
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    })
            } else {
                // INSERT if user has none of these objects

                db.run("INSERT INTO UserObjects (UserEmail, ObjectName, ObjectAmount) VALUES (?, ?, ?)",
                email,
                animalName,
                parseInt(amount),
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    })

            }
            res.json({
                data: {
                    status: 200,
                    msg: `${amount} ${animalName} objects were bought.`
                }
            })
        })
    })
});

router.post("/sell/:name",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => {
    var animalName = req.params.name;
    var amount = req.body.amount;
    var email = req.body.email;
    var oldBalance = 0;
    var newBalance = 0;
    var price = 0;

    db.serialize(function() {
        var enough = true;

        db.get("SELECT Price FROM Objects WHERE Name = ?",
        animalName,
        (err, objectPrice) => {
            price = objectPrice.Price;
        })

        db.get("SELECT ObjectAmount FROM UserObjects WHERE UserEmail = ? AND ObjectName = ?",
        email,
        animalName,
        (err, objectInfo) => {
            var newAmount = objectInfo.ObjectAmount - parseInt(amount);
            if (newAmount > 0) {
                // UPDATE if user already has these objects

                db.run("UPDATE UserObjects SET ObjectAmount = ? WHERE UserEmail = ? AND ObjectName = ?",
                newAmount,
                email,
                animalName,
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    })
            } else if (newAmount == 0) {
                db.run("DELETE FROM UserObjects WHERE UserEmail = ? AND ObjectName = ?",
                email,
                animalName,
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    })
            } else {
                // Not enough objects in inventory
                res.json({
                    data: {
                        status: 400,
                        msg: "Not enough objects in inventory."
                    }
                })
                enough = false;
            }
        })

        db.get("SELECT Balance FROM Users WHERE Email = ?",
        email,
        (err, userBalance) => {
            if (enough) {
                oldBalance = userBalance.Balance;
                newBalance = oldBalance + (amount*price);

                db.run("UPDATE Users SET Balance = ? WHERE Email = ?",
                newBalance,
                email,
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    })
                res.json({
                    data: {
                        status: 200,
                        msg: `${amount} ${animalName} objects were sold.`
                    }
                })
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
                    msg: `Invalid token.`
                }
            });
        } else {
            // Valid token send on the request
            next();
        }
    });
}

module.exports = router;

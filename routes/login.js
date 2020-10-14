var express = require('express');
var router = express.Router();

// Database purposes
const db = require("../db/database.js");

// For hashing purposes
const bcrypt = require('bcryptjs');

//JSON Web Tokens
const jwt = require('jsonwebtoken');

// Basic route
router.post("/", (req, res) => {
    var email = req.body.email;
    db.get("SELECT Password FROM Users WHERE Email=?",
        email,
        (err, row) => {
            if (!row) {
                res.status(404).json({
                     data: {
                         msg: false
                     }
                 });
            } else {
                bcrypt.compare(req.body.password, row.Password, function(err, bres) {
                    // res is true if correct password, otherwise false.
                    if (bres) {

                        const payload = { email: email };
                        const secret = process.env.JWT_SECRET;

                        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

                        res.cookie('token', token, {maxAge: 9000000, httpOnly: true});

                        res.json({
                            data: {
                                type: "success",
                                msg: "User logged in",
                                token: token
                            }
                        });

                    } else {
                        console.log("Incorrect password.");
                        res.status(401).json({
                            data: {
                                status: 401,
                                title: "Wrong password",
                                detail: "Password is incorrect"

                            }
                        });
                    }
                });
            }
    });
});

module.exports = router;

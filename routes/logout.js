var express = require('express');
var router = express.Router();

// Basic route
router.post("/", (req, res) => {
        res.cookie('token', '');

        res.json({
            data: {
                type: "success",
                msg: "User logged out"
            }
        });
});

module.exports = router;

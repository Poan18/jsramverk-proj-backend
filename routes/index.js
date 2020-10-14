var express = require('express');
var router = express.Router();

// Basic route
router.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Lowkey works."
        }
    };

    res.json(data);
});

module.exports = router;

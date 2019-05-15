const express = require('express');
const router = express.Router();

router.post('/student', function (req, res, next) { //TODO
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;
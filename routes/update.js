const express = require('express');
const router = express.Router();

router.post('/student', function (req, res, next) { //TODO
    console.log(req.body);
    res.render("student-detail", {
        student: {
            studentID: "20173333",
            name: "SMZ",
            sex: "Female",
            entranceAge: "18",
            entranceYear: "2017",
            major: "CS",
            password: "233"
        },
        error: req.flash('error'),
        info: "Information update succeeded."
    })
});

module.exports = router;
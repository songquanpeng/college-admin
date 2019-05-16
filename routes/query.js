const express = require('express');
const router = express.Router();
const Data = require("../models/Data").Data;
const checkLogin = require("../middlewares/check").checkLogin;

router.post("/", checkLogin, function (req, res) {//TODO: handle all types of query post request
    Data.getDataByTypeAndObject(req.body.queryType, {
        "studentID": req.body.sID,
        "name": req.body.sName,
        "sex": req.body.sSex,
        "entranceAge": req.body.sEnAge,
        "entranceYear": req.body.sEnYear,
        "major": req.body.sMajor
    }, function (error, data) {
        //const userType = req.session.user.userType;
        //console.log(userType);
        res.render('query', {
            userType: req.session.user.userType,
            queryType: req.body.queryType,
            userData: data,
            info: req.flash('info'),
            error: req.flash('error')
        });
    });
});


module.exports = router;

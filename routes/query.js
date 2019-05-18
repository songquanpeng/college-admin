const express = require('express');
const router = express.Router();
const Data = require("../models/Data").Data;
const checkLogin = require("../middlewares/check").checkLogin;
const isAdmin = require("../middlewares/check").isAdmin;

router.post("/", checkLogin, function (req, res) {
    // Data.getDataByTypeAndObject(req.body.queryType, {
    //     "studentID": req.body.sID,
    //     "name": req.body.sName,
    //     "sex": req.body.sSex,
    //     "entranceAge": req.body.sEnAge,
    //     "entranceYear": req.body.sEnYear,
    //     "major": req.body.sMajor
    // }, function (error, data) {
    Data.getDataByReqBody(req.body, function (error, data) {
        //const userType = req.session.user.userType;
        //console.log(userType);
        console.log(error);
        console.log(data);
        res.render('query', {
            userType: req.session.user.userType,
            queryType: req.body.queryType,
            userData: data,
            info: req.flash('info'),
            error: req.flash('error')
        });
    });
});

router.post("/update-student/", checkLogin, isAdmin, function (req, res) {
   Data.updateDataByTypeAndReqBody("student", req.body, function (error) {
       if (error){
           req.flash('error', error.message);
       } else {
           req.flash('info', "Update successfully")
       }
       // res.render('query', {
       //     userType: "",
       //     queryType: "",
       //     userData: undefined,
       //     info : req.flash('info'),
       //     error : req.flash('error')
       // });
       res.redirect('back');
   })
});


module.exports = router;

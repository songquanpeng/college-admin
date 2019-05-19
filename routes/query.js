const express = require('express');
const router = express.Router();
const Data = require("../models/data").Data;
const checkLogin = require("../middlewares/check").checkLogin;
const isAdmin = require("../middlewares/check").isAdmin;

router.post("/", checkLogin, function (req, res) {
    Data.getDataByReqBody(req.body, function (error, data) {
        res.render('query', {
            userType: req.session.user.userType,
            queryType: req.body.queryType,
            userData: data,
            info: req.flash('info'),
            error: req.flash('error')
        });
    });
});


router.post("/delete-student", checkLogin, isAdmin, function (req, res) {
    Data.deleteDataByTypeAndReqBody("student", req.body, function (error) {
        if (error){
            req.flash('error', error.message);
        } else {
            req.flash('info', "Delete successfully")
        }
        res.redirect('back');
    })
});

router.post("/delete-teacher", checkLogin, isAdmin, function (req, res) {
    Data.deleteDataByTypeAndReqBody("teacher", req.body, function (error) {
        if (error){
            req.flash('error', error.message);
        } else {
            req.flash('info', "Delete successfully")
        }
        res.redirect('back');
    })
});

router.post("/delete-course", checkLogin, isAdmin, function (req, res) {
    Data.deleteDataByTypeAndReqBody("course", req.body, function (error) {
        if (error){
            req.flash('error', error.message);
        } else {
            req.flash('info', "Delete successfully")
        }
        res.redirect('back');
    })
});

router.post("/delete-cc-info", checkLogin, isAdmin, function (req, res) {
    Data.deleteDataByTypeAndReqBody("cc-info", req.body, function (error) {
        if (error){
            req.flash('error', error.message);
        } else {
            req.flash('info', "Delete successfully")
        }
        res.redirect('back');
    })
});

module.exports = router;

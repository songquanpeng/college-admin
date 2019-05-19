const express = require('express');
const router = express.Router();
const Data = require("../models/data").Data;
const checkLogin = require("../middlewares/check").checkLogin;
const isAdmin = require("../middlewares/check").isAdmin;



router.post("/student", checkLogin, isAdmin, function (req, res) {
    Data.updateDataByTypeAndReqBody("student", req.body, function (error) {
        if (error){
            req.flash('error', error.message);
        } else {
            req.flash('info', "Update successfully")
        }
        res.redirect('/query');
    })
});

router.post("/teacher", checkLogin, isAdmin, function (req, res) {
    Data.updateDataByTypeAndReqBody("teacher", req.body, function (error) {
        if (error){
            req.flash('error', error.message);
        } else {
            req.flash('info', "Update successfully")
        }
        res.redirect('/query');
    })
});

router.post("/course", checkLogin, isAdmin, function (req, res) {
    Data.updateDataByTypeAndReqBody("course", req.body, function (error) {
        if (error){
            req.flash('error', error.message);
        } else {
            req.flash('info', "Update successfully")
        }
        res.redirect('/query');
    })
});

router.post("/cc-info", checkLogin, isAdmin, function (req, res) {
    Data.updateDataByTypeAndReqBody("cc-info", req.body, function (error) {
        if (error){
            req.flash('error', error.message);
        } else {
            req.flash('info', "Update successfully")
        }
        res.redirect('/query');
    })
});


module.exports = router;
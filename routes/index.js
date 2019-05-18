const express = require('express');
const router = express.Router();
const Data = require("../models/Data").Data;
const isAdmin = require("../middlewares/check").isAdmin;
const record = require('../middlewares/record').record;


router.get('/', record, function (req, res, next) {
    res.render('index', {
        info: "Welcome, dear user :)",
        error: req.flash('error')
    });
});

router.get('/about', function (req, res, next) {
    res.render('about', {
        info: req.flash('error'),
        error: req.flash('error')
    });
});

router.get('/user', function (req, res, next) {
    if (req.session.user === undefined) {
        res.render("login", {error: req.flash('error'), info: req.flash('info')});
    } else {
        Data.getDataByTypeAndID(req.session.user.userType, req.session.user.userID, (error, data) => {
            //console.log(data);
            res.render(req.session.user.userType + "-detail", {
                data: data,
                error: (error !== null) ? error.message : req.flash('error'),
                info: req.flash('info')
            })
        });
    }
});

router.get('/logout', function (req, res, next) {
    req.session.user = undefined;
    res.render("login", {error: req.flash('error'), info: req.flash('info')});
});

router.post('/login', function (req, res, next) {
    const userID = req.body.userID;
    const password = req.body.password;
    const userType = req.body.userType;

    Data.checkCredential(userID, password, userType, (error, valid) => {
        if (error) {
            console.error(error.message);
            req.flash("error", "Server internal error, we are sorry for that.");
        } else {
            if (valid) {
                req.session.user = {
                    userID: userID,
                    userType: userType
                };
                req.flash("info", "Login Successfully");
            } else {
                req.flash("error", "Invalid credentials, please try again!");
            }
        }
        const backURL = req.body.referrer || '/';
        res.redirect(backURL);
    });
});

router.get('/query', function (req, res, next) {
    res.render('query', {
        userType: "",
        queryType: "",
        userData: undefined,
        info: req.flash('info'),
        error: req.flash('error')
    });
});

router.post('/detail', isAdmin, function (req, res, next) {
    Data.getDataByTypeAndID(req.body.type, req.body.id, (error, data) => {
        //console.log(data);
        res.render(req.body.type + "-detail", {
            data: data,
            error: (error !== null) ? error.message : req.flash('error'),
            info: req.flash('info')
        });
    });
});

router.post('/insert',isAdmin,function (req, res, next) {
    Data.insertNewData(req.body.type, req.body, (error)=>{
        if(error){
            req.flash('error', error.message);
        }else {
            req.flash('info', "Insert successfully.")
        }
        res.render('query', {
            userType: "",
            queryType: "",
            userData: undefined,
            info : req.flash('info'),
            error : req.flash('error')
        });
    });
});

module.exports = router;

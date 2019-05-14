const express = require('express');
const router = express.Router();
const User = require("../models/user").User;

/* GET home page. */
router.get('/', function (req, res, next) {
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
        res.send("Your personal info will be showed here.");
    }
});

router.post('/login', function (req, res, next) {
    const userID = req.body.userID;
    const password = req.body.password;
    const userType = req.body.userType;

    User.checkCredential(userID, password, userType, (error, valid) => {
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
        res.redirect('/user');
    });
});

module.exports = router;

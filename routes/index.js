const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
    info: "Hi!",
    error: req.flash('error')
  });
});

module.exports = router;

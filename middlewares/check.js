const User = require('../models/user');

module.exports = {
  checkLogin : function (req, res, next) {
      if (req.session.user === undefined) {
          req.flash('error', "This operation requires login");
          res.redirect('/user');
      } else {
          next();
      }
  }  
};
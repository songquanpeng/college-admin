module.exports = {
  checkLogin : function checkLogin (req, res, next) {
      if (req.session.user === undefined) {
          req.flash('error', "This operation requires login.");
          res.redirect('/user');
      } else {
          next();
      }
  },
    isAdmin:function isAdmin(req, res, next) {
        if (req.session.user === undefined) {
            req.flash('error', "This operation requires login.");
            res.redirect('/user');
        } else {
            if(req.session.user.userType !== "admin"){
                req.flash('error', "Permission Denied, please try to log in with an administrator account.");
                res.redirect('/user');
            }
            else {
                next();
            }
        }
    }
};
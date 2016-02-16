var _ = require('underscore');

exports.renderApp = function(req, res, next) {
  if(_.isEmpty(req.user)) {
    res.render('app', {
      hostname: req.hostname,
      user: {}
    });
  } else {
    var user = req.user;
    return res.render('app', {
      hostname: req.hostname,
      user: user
    });
  }
};

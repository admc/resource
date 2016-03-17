var home = {};

home.index = function(req, res) {
  res.render('home', { layout:false });
};

module.exports = home;

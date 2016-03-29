var models = require('../helpers/models');
var project = {};

project.list = function(req, res) {
  models.Project.filter({username: req.user.username}).run().then(function(projects) {
    res.json(projects);
  })
};

project.create = function(req, res) {
  var p = new models.Project(req.body);
  p.username = req.user.username;
  p.admin = [req.user.username];
  //p.stakeholders = req.body.stakeholders.split(",");
  p.stakeholders = [];
  p.created = Date.now();
  p.save().then(function(result) {
    res.json(result);
  })
};

project.view = function(req, res) {
  console.log(req.params)
  models.Project.get(req.params.id).run().then(function(result) {
    console.log(result)
    res.json(result);
  })
};

module.exports = project;

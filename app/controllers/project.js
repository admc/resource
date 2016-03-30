var models = require('../helpers/models');
var project = {};

project.list = function(req, res) {
  models.Organization.get(req.user.organizations[0].id)
    .getJoin({projects: true}).run()
    .then(function(organization) {
      res.json(organization.projects);
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

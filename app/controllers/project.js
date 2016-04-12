var models = require('../helpers/models');
var project = {};

project.list = function(req, res) {
  models.Organization.get(req.user.organizations[0].id)
    .getJoin({projects: true, users: true}).run()
    .then(function(organization) {
      res.json(organization.projects);
    })
};

project.create = function(req, res) {
  var p = new models.Project(req.body);
  p.username = req.user.username;
  //p.stakeholders = req.body.stakeholders.split(",");
  p.stakeholders = [];
  p.created = Date.now();
  p.save().then(function(result) {
    res.json(result);
  })
};

project.view = function(req, res) {
  models.Project.get(req.params.id)
    .getJoin({
      users: true
    , updates: {
        _apply: function(sequence) {
          return sequence.orderBy('created')
        }
     }
    }).run()
    .then(function(project) {
      res.json(project);
    })
};

project.user = function(req, res) {
  models.User.get(req.params.id)
    .getJoin({
      projects: true
      , users: true
      , organizations: true
    }).run()
    .then(function(user) {
      console.log(user)
      res.json(user.projects);
    })
};

module.exports = project;

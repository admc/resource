var models = require('../helpers/models');
var update = {};

update.list = function(req, res) {
  models.Organization.get(req.user.organizations[0].id)
    .getJoin({updates: true, users: true}).run()
    .then(function(organization) {
      console.log(organization)
      res.json(organization.updates);
    })
};

update.create = function(req, res) {
  models.Project.get(req.body.projectId).run().then(function(project) {
    delete req.body.projectId;

    var u = new models.Update(req.body);
    u.username = req.user.username;
    u.created = Date.now();

    u.saveAll({}).then(function(savedUpdate) {
      project.updates = [savedUpdate];
      project.saveAll({updates: true}).then(function(result) {
        res.json(savedUpdate);
      })
    })
  })
};

update.view = function(req, res) {
  models.update.get(req.params.id)
    .getJoin({users: true}).run()
    .then(function(update) {
      res.json(update);
    })
};

module.exports = update;

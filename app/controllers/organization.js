var models = require('../helpers/models');
var organization = {};

/*organization.list = function(req, res) {
  models.Organization.get(req.user.organizations[0].id)
    .getJoin({organizations: true, users: true}).run()
    .then(function(organization) {
      res.json(organization.organizations);
    })
};

organization.create = function(req, res) {
  var p = new models.organization(req.body);
  p.username = req.user.username;
  p.admin = [req.user.username];
  //p.stakeholders = req.body.stakeholders.split(",");
  p.stakeholders = [];
  p.created = Date.now();
  p.save().then(function(result) {
    res.json(result);
  })
};*/

organization.view = function(req, res) {
  models.Organization.get(req.params.id)
  .getJoin({
    users: {
      _apply: function(sequence) {
        return sequence.orderBy('department')
      }
  }, projects: {
      _apply: function(sequence) {
        return sequence.orderBy('created')
      }
   }
  }).run()
  .then(function(org) {
    res.json(org);
  })
};

module.exports = organization;

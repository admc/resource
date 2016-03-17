var db = require('../helpers/db');

var experience = {};
var table = "experience";

experience.all = function(req, res) {
  db.table(table).filter({username: req.user.username}).run()
    .then(function(experiences) {
      res.json(experiences);
    });
};

experience.create = function(req, res) {
  var experience = req.body;
  experience.username = req.user.username;
  experience.created = Date.now();

  db.table(table).insert(experience).run()
    .then(function(result) {
      res.json({id: result.generated_keys[0]});
    })
};

experience.view = function(req, res) {
  db.table(table).get(req.params.id).run()
    .then(function (experience) {
      res.json(experience);
    })
};

module.exports = experience;

var db = require('../helpers/db');

var collection = {};
var table = "collection";

collection.all = function(req, res) {
  db.table(table).filter({username: req.user.username}).run()
    .then(function(collections) {
      res.json(collections);
    })
};

collection.create = function(req, res) {
  var collection = req.body;
  collection.username = req.user.username;
  collection.created = Date.now();

  db.table(table).insert(collection).run()
    .then(function(result) {
      res.json({id: result.generated_keys[0]});
    })
};

collection.view = function(req, res) {
  db.table(table).get(req.params.id).run()
    .then(function (collection) {
      res.json(collection);
    })
};

module.exports = collection;

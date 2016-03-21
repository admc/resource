var db = require('../helpers/db');
var type = db.type;

var User = db.createModel("User", {
  id: type.string()
  , username: type.string().lowercase().alphanum().min(3).required()
  , firstname: type.string().optional()
  , lastname: type.string().optional()
  , email: type.string().email().lowercase().required()
  , password: type.string().required()
  , created: type.date().required()
});

exports.User = User;

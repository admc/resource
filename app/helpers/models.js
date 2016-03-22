// An instance of thinky
// instantiated with env informed db connection data
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
  , lastname: type.string().optional()
  , title: type.string().optional()
  , department: type.string().optional()
  , team: type.string().optional()
});
exports.User = User;

var Attribute = db.createModel("Attribute", {
  id: type.string()
  , name: type.string().lowercase().alphanum().min(3).required()
  , description: type.string().optional()
  , created: type.date().required()
});
exports.Attribute = Attribute;

var Organization = db.createModel("Organization", {
  id: type.string()
  , name: type.string().lowercase().alphanum().min(3).required()
  , description: type.string().optional()
  , url: type.string().optional()
  , created: type.date().required()
  , admin: type.array().required()
});
exports.Organization = Organization;

//how do integrate the concept of a checklist
var Project = db.createModel("Project", {
  id: type.string()
  , name: type.string().lowercase().alphanum().min(3).required()
  , description: type.string().optional()
  , epic: type.string().optional()
  , spec: type.string().optional()
  , notes: type.string().optional()
  , quarter: type.string().optional()
  , year: type.string().optional()
  , start: type.date().optional()
  , finish: type.date().optional()
  , status: type.string().required()
  , created: type.date().required()
  , admin: type.array().required()
  , lead: type.string().optional()
  , pm: type.string().optional()
  , stakeholders: type.array().optional()
});
exports.Project = Project;

var Update = db.createModel("Update", {
  id: type.string()
  , subject: type.string().lowercase().alphanum().min(3).optional()
  , text: type.string().required()
  , created: type.date().required()
  , user: type.string().required()
});
exports.Update = Update;

var Comment = db.createModel("Comment", {
  id: type.string()
  , subject: type.string().lowercase().alphanum().min(3).optional()
  , text: type.string().required()
  , created: type.date().required()
  , user: type.string().required()
});
exports.Comment = Comment;

/*
* var steps = {
*   one: {
*     text: "Get a code review",
*     status: true
*     username: user.username
*   }
* }
*/
var Checklist = db.createModel("Checklist", {
  id: type.string()
  , name: type.string().required() 
  , steps: type.object().required() 
});
exports.Checklist = Checklist;

Project.hasAndBelongsToMany(Organization, "organizations", "id", "id");
Update.hasAndBelongsToMany(Project, "projects", "id", "id");

User.hasAndBelongsToMany(Organization, "organizations", "id", "id");
User.hasAndBelongsToMany(Project, "projects", "id", "id");

Comment.hasAndBelongsToMany(Project, "projects", "id", "id");
Comment.hasAndBelongsToMany(Update, "updates", "id", "id");

Checklist.hasAndBelongsToMany(Project, "projects", "id", "id");

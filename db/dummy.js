var models = require('../app/helpers/models');
var hash = require('../app/helpers/hash');
var _ = require('lodash');

var org = {
  name: "Betable"
  , description: "Gambling reinvented"
  , url: "http://www.betable.com"
  , created: Date.now()
};

var orgOne = {
  name: "Ninjas"
  , description: "Meeting of the ninjas"
  , url: "http://www.ninjameetings.com"
  , created: Date.now()
};

var user = {
  username: 'tester'
  , firstname: 'Tester'
  , lastname: 'One'
  , email: ''
  , password: hash.generateHash('testing')
  , created: Date.now()
  , title: "Software Engineer"
  , department: "engineering"
  , team: "web"
};

var project = {
   name: "Test Project" 
  , description: "The worlds most important project" 
  , epic: "http://company.atlassian.com/project/epic" 
  , spec: "http://docs.google.com/company/spec" 
  , notes: "http://ghe.company.com/engineering/notes" 
  , quarter: "q3" 
  , year: "2016" 
  , status: "Not Started" 
  , created: Date.now() 
  , lead: "thauber"
  , pm: "stratos"
  , stakeholders: ["gaetano", "rylinton"]
  , username: "tester1"
};


var one = new models.Attribute({
  name: "angular"
  , description: "ninja with JS"
  , created: Date.now()
});
var two = new models.Attribute({
  name: "react"
  , description: "ninja with react"
  , created: Date.now()
});

var three = new models.Attribute({
  name: "css"
  , description: "ninja with css"
  , created: Date.now()
});

//create potential user attributes
models.Attribute.save([one, two, three]).then(function(attributes) {
  var users = []; //array of users
  for (var i = 0; i < 10; i++) {
    var obj = JSON.parse(JSON.stringify(user));
    obj.username += i;
    obj.email = "user"+i+"@gmail.com";
    users.push(obj);
  };

  //save all those users to the db
  models.User.save(users).then(function(savedUsers) {
    // create a new project
    var newProject = new models.Project(project);
    newProject.users = savedUsers; //it has all the users as participants
    newProject.saveAll({users: true}).then(function(savedProject) {
      //create a new org, with all the users, and all the projects
      var newOrg = new models.Organization(org)
      newOrg.users = savedUsers;
      newOrg.projects = [savedProject]
      newOrg.saveAll({users: true, projects: true}).then(function(savedOrg) {
        var newOrgOne = new models.Organization(orgOne)
        newOrgOne.users = savedUsers;
        newOrgOne.projects = [savedProject]
        newOrgOne.saveAll({users: true, projects: true}).then(function(savedOrgOne) {
          //give users all their attributes, and let them know the org they are in
          models.User.filter({}).run().then(function(users) {
            _(users).forEach(function(user) { 
              models.User.get(user.id).run().then(function(userObj) {
                userObj.attributes = attributes;
                userObj.organizations = [savedOrg, savedOrgOne];
                userObj.saveAll({attributes: true, organizations: true}).then(function(done) {
                  console.log(user.username);
                })
              })
            })
          })
        })
      })
    })
  })
})


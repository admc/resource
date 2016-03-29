var models = require('../app/helpers/models');
var hash = require('../app/helpers/hash');
var _ = require('lodash');

var org = {
  name: "Betable"
  , description: "Gambling reinvented"
  , url: "http://www.betable.com"
  , admin: ["admc"]
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
  , admin: ["admc", "tester1"] 
  , lead: "thauber"
  , pm: "stratos"
  , stakeholders: ["gaetano", "rylinton"] 
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

models.Attribute.save([one, two, three]).then(function(attributes) {
  var users = [];
  for (var i = 0; i < 10; i++) {
    var obj = JSON.parse(JSON.stringify(user));
    obj.username += i;
    obj.email = "user"+i+"@gmail.com";
    //obj.attributes = attributes;
    users.push(obj);
  };

  models.User.save(users).then(function(saved) {
    console.log(saved)
    var newOrg = new models.Organization(org)
    newOrg.users = saved;
    newOrg.saveAll({users: true}).then(function(result) {
      models.User.filter({}).run().then(function(users) {
        _(users).forEach(function(user) { 
          console.log(user.username);
          models.User.get(user.id).run().then(function(userObj) {
            userObj.attributes = attributes;
            userObj.saveAll({attributes: true}).then(function(done) {
              console.log(done);
            })
          })
        });
      });
    });
  })
});


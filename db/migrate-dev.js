#! /usr/bin/env node

var bluebird = require('bluebird');
var config = require('../config/database');
var r = require('rethinkdb');
var hash = require('../app/helpers/hash');
var user = {
  username: 'tester1'
  , firstname: 'Tester'
  , lastname: 'One'
  , email: 'adam.christian@gmail.com'
  , password: hash.generateHash('testing')
  , created: Date.now()
  , updated: Date.now()
};

bluebird.coroutine(function*() {

  if (process.env.NODE_ENV == "production") {
    console.log("CAREFUL RUNNING THIS IN PRODUCTION!")
    return;
  }

  var conn = yield r.connect(config);

  try {
    console.log(yield r.dbDrop("development").run(conn))
  } catch(err) { console.log(err) }

  console.log(yield r.dbCreate("development").run(conn))

  console.log(yield r.tableCreate("session").run(conn))

  console.log(yield r.tableCreate("user").run(conn))
  console.log(yield r.table("user").indexCreate("username").run(conn))
  console.log(yield r.table("user").indexCreate("email").run(conn))

  //console.log(yield r.table("user").insert(user).run(conn))
  console.log(yield r.table("user").filter({"username": user.username}).coerceTo("array").run(conn))

  console.log(yield r.tableCreate("collection").run(conn))
  console.log(yield r.table("collection").indexCreate("username").run(conn))

  console.log(yield r.tableCreate("experience").run(conn))
  console.log(yield r.table("experience").indexCreate("username").run(conn))
  console.log(yield r.table("experience").indexCreate("type").run(conn))

  conn.close();
})();

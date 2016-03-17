#! /usr/bin/env node

var bluebird = require('bluebird');
var db = require('../config/database');
var r = require('rethinkdb');
var hash = require('../app/helpers/hash');
var user = {
  username: 'admin'
  , firstname: 'admin'
  , lastname: 'admin'
  , email: 'adam.christian@gmail.com'
  , password: hash.generateHash('testing')
  , created: Date.now()
  , updated: Date.now()
};

bluebird.coroutine(function*() {

  var conn = yield r.connect(db);

  console.log(yield r.dbCreate("production").run(conn))

  console.log(yield r.tableCreate("session").run(conn))

  console.log(yield r.tableCreate("user").run(conn))
  console.log(yield r.table("user").indexCreate("username").run(conn))
  console.log(yield r.table("user").indexCreate("email").run(conn))

  console.log(yield r.table("user").insert(user).run(conn))
  console.log(yield r.table("user").filter({"username": user.username}).coerceTo("array").run(conn))

  console.log(yield r.tableCreate("collection").run(conn))
  console.log(yield r.table("collection").indexCreate("username").run(conn))

  console.log(yield r.tableCreate("experience").run(conn))
  console.log(yield r.table("experience").indexCreate("username").run(conn))
  console.log(yield r.table("experience").indexCreate("type").run(conn))

  conn.close();
})();

var schema = require('validate');
var user = schema({
  username: {
    type: 'string'
    , required: true
    , match: /^[a-z0-9_-]{3,16}$/
    , message: 'Invalid username.'
  }
  , firstname: {
    type: 'string'
    , required: true
    , message: 'First name is required.'
  }
  , lastname: {
    type: 'string'
    , required: true
    , message: 'Last name is required.'
  }
  , email: {
    type: 'string'
    , required: true
    , match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ 
    , message: 'Invalid email address.'
  }
  , password: {
    type: 'string'
    , required: true
    , match: /^[a-z0-9_-]{6,18}$/
    , message: 'Invalid password.'
  }
});

exports.user = user;

# README #

This is the app repository for the wild.io app server (user experience after login).

### Setup ###

* Clone
* npm install
* setup postgres (the .app works great)
* create a development database: 'create database development;'
* npm install -g sequelize-cli 
* sequelize db:migrate
* sequelize db:seed
* gulp dev
* localhost:3000 - admin:testing

### Contribution guidelines ###

* Pull requests required 
* Code reviews
* Following coding standards (ES6 when possible, _onEvent, comma first, camelCase)
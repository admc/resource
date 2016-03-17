var config = {
  "development": {
      "db": "development",
      "host": "127.0.0.1",
      "port": "28015",
      "logLevel": "info"
    },
  "production": {
      "db": "production",
      "host": "127.0.0.1",
      "port": "28015",
      "logLevel": "info"
    }
}

var env = process.env.NODE_ENV || "development";
module.exports = config[env];

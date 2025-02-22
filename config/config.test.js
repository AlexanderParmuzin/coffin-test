const config = require("./config.global");

config.log.console = true;
config.log.debug = true;

config.jwt.secretKey = "jwt-test-secretKey";
config.jwt.verify.maxAge = 604800;

config.uri = "mongodb://localhost:27017";
config.database = "test-coffin";
config.id = "testDB";

module.exports = config;

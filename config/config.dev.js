const config = require("./config.global");

config.jwt.secretKey = "jwt-secretKey";
config.jwt.verify.maxAge = 604800;

config.uri = "mongodb://localhost:27017";
config.database = "coffin";
config.id = "developDB";

module.exports = config;

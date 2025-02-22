const { Router } = require("express");
const actions = require("./users.actions");
const validator = require("./users.validator");

module.exports = Router()
  .post("/users/login", ...validator.postLogin, actions.login)
  .post("/users/signup", ...validator.postSignup, actions.signup);

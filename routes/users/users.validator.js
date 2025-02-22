const { check } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const postLogin = [
  check("login")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "login: parameter is required",
    }),
  check("password")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter is required",
    }),
  validate,
];

const postSignup = [
  check("login")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "login: parameter is required",
    }),
  check("password")
    .notEmpty()
    .isLength({ min: 6, max: 12})
    .withMessage({
      code: UnprocessableEntity,
      message: "password: has to be from 6 to 12 symbols",
    }),
  validate,
];

module.exports = { postLogin, postSignup };

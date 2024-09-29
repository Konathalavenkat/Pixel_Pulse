const { check } = require("express-validator");

const SignUpValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .notEmpty()
    .withMessage("Password must be at least 6 characters")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const SignInValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

const EmailValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
];

const EmailCodeValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),

  check("code").notEmpty().withMessage("Code is required"),
];

const RecoverPasswordValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),

  check("code").notEmpty().withMessage("Code is required"),

  check("password")
    .notEmpty()
    .withMessage("Password must be at least 6 characters")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = {
  SignUpValidator,
  SignInValidator,
  EmailValidator,
  EmailCodeValidator,
  RecoverPasswordValidator,
};

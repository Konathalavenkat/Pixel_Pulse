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

const SendVerifyValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
];

module.exports = { SignUpValidator, SignInValidator,SendVerifyValidator };

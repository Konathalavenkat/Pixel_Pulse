const express = require('express');
const router = express.Router();
const {authController} = require('../controllers');
const {SignUpValidator,SignInValidator,EmailValidator,EmailCodeValidator,RecoverPasswordValidator}= require('../validators/auth')
const validate = require('../validators/validate');


router.post('/signup',SignUpValidator,validate, authController.signup);

router.post('/signin',SignInValidator,validate, authController.signin);

router.get('/get-verification-code', EmailValidator,validate, authController.getVerificationCode);

router.post('/verify-email',EmailCodeValidator,validate, authController.verifyEmail);

router.post('/send-forgot-password-code',EmailValidator,validate, authController.sendForgotPasswordCode);

router.post('/recover-password', RecoverPasswordValidator,validate, authController.RecoverPassword);

module.exports = router;
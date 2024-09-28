const express = require('express');
const router = express.Router();
const {authController} = require('../controllers');
const {SignUpValidator,SignInValidator,SendVerifyValidator}= require('../validators/auth')
const validate = require('../validators/validate');


router.post('/signup',SignUpValidator,validate, authController.signup);

router.post('/signin',SignInValidator,validate, authController.signin);

router.get('/get-verification-code', SendVerifyValidator,validate, authController.getVerificationCode);

module.exports = router;
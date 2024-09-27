const express = require('express');
const router = express.Router();
const {authController} = require('../controllers');
const SignUpValidator= require('../validators/auth')
const validate = require('../validators/validate');


router.post('/signup',SignUpValidator,validate, authController.signup);



module.exports = router;
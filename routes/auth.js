const express = require('express');
const router = express.Router();
const {authController} = requrie('../controllers');

router.post('signup', authController.signup);



module.exports = router;
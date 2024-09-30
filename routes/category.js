const express = require('express');
const {categoryController} = require('../controllers');
const router = express.Router();
const {categoryValidator} = require('../validators/category');
const validate = require('../validators/validate');
const isAuth=require('../middlewares/isAuth');

router.post('/add-category',isAuth, categoryValidator,validate,categoryController.addCategory);

module.exports = router;
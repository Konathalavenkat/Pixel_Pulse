const express = require("express");
const isAuth = require("../middlewares/isAuth");
router = express.Router();
const {postController} = require("../controllers")
const {addPostValidator} = require("../validators/post");
const validate = require("../validators/validate");

router.post('/add-post', isAuth,addPostValidator,validate, postController.addPost)

module.exports = router;

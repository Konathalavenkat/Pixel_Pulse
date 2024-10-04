const express = require("express");
const isAuth = require("../middlewares/isAuth");
router = express.Router();
const {postController} = require("../controllers")
const {addPostValidator,IdValidator,updatePostValidator} = require("../validators/post");
const validate = require("../validators/validate");

router.post('/', isAuth,addPostValidator,validate, postController.addPost)

router.put('/:id', isAuth, updatePostValidator,IdValidator,validate, postController.updatePost)

module.exports = router;

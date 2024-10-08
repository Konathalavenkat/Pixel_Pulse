const express = require("express");
const isAuth = require("../middlewares/isAuth");
router = express.Router();
const { postController } = require("../controllers");
const {
  addPostValidator,
  IdValidator,
  updatePostValidator,
} = require("../validators/post");
const validate = require("../validators/validate");

router.post("/", isAuth, addPostValidator, validate, postController.addPost);

router.put(
  "/:id",
  isAuth,
  updatePostValidator,
  IdValidator,
  validate,
  postController.updatePost
);

router.delete("/:id", isAuth, IdValidator, validate, postController.deletePost);

router.get("/:id", isAuth, IdValidator, validate, postController.getPostById);

router.get('/',isAuth, postController.getPosts)

module.exports = router;

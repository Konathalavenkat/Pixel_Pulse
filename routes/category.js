const express = require("express");
const { categoryController } = require("../controllers");
const router = express.Router();
const { categoryValidator, idValidator } = require("../validators/category");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isadmin = require("../middlewares/isadmin");

router.post(
  "/add-category",
  isAuth,
  isadmin,
  categoryValidator,
  validate,
  categoryController.addCategory
);

router.put(
  "/update-category/:id",
  isAuth,
  isadmin,
  idValidator,
  validate,
  categoryController.updateCategory
);

router.delete(
  "/delete-category/:id",
  isAuth,
  isadmin,
  idValidator,
  validate,
  categoryController.deleteCategory
);

router.get(
  "/get-category",
  isAuth,
  categoryController.getCategory
);

module.exports = router;

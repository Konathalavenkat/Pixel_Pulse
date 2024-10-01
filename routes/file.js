const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { fileController } = require("../controllers");
const upload = require("../middlewares/upload");

router.post(
  "/upload",
  isAuth,
  upload.array("image",3), //upload.single("image") if we want to upload only one file
  fileController.uploadFile
);

module.exports = router;

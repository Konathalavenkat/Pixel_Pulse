const { check } = require("express-validator");
const { default: mongoose } = require("mongoose");

const addPostValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .custom(async(category) =>{ 
        if (!mongoose.Types.ObjectId.isValid(category)) {
          throw new Error("Invalid category");
        }
    }),
  check("file").custom(async (file) => {
    if (file) {
      if (!mongoose.Types.ObjectId.isValid(file)) {
        throw new Error("Invalid file");
      }
    }
  }),
];

module.exports = { addPostValidator };
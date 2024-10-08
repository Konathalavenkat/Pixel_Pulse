const { check,param } = require("express-validator");
const mongoose = require("mongoose");

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

const updatePostValidator = [
  check("category")
    .custom(async(category) =>{ 
      if(category)
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
]

const IdValidator =[
  param("id").custom(async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Post id");
    }
  }),
] 

module.exports = { addPostValidator,updatePostValidator,IdValidator };
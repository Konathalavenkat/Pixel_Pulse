const {check} = require('express-validator');
const mongoose = require('mongoose');
const categoryValidator = [
    check('name').notEmpty().withMessage('Name is required')
]

const idValidator = [
    check("id").custom(async (id)=>{
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid id");
        }
    })
]

module.exports = {categoryValidator,idValidator};
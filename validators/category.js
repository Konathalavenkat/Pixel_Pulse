const {check} = require('express-validator');

const categoryValidator = [
    check('name').notEmpty().withMessage('Name is required')
 
]

module.exports = {categoryValidator};
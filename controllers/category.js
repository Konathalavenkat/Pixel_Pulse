const {user,category} = require('../models')

const addCategory = async (req,res,next) => {
    try{
        const {name,description} = req.body;
        const {_id} = req.user;
        const isexist = await category.findOne({name:name});
        if(isexist){
            res.code=400;
            throw new Error("Category already exists");
        }
        const User = await user.findById(_id);
        if(!User){
            res.code=404;
            throw new Error("User not found");
        }
        const newCategory = new category({
            name,
            description,
            updatedBy:_id
        });
        await newCategory.save();
        res.status(201).json({code:201,status:true,message: "Category added successfully",category:newCategory});

    }
    catch(e){
        next(e);
    }
}

module.exports = {addCategory}
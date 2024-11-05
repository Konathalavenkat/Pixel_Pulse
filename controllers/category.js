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

const updateCategory = async (req,res,next) => {
    try{
        const {id} = req.params;
        const {_id} = req.user;
        const {name,description} = req.body;
        const Category = await category.findById(id);
        if(!Category) {
            res.code=404;
            throw new Error("Category not found");
        }
        const categorywithtitle = await category.findOne({name});
        if(categorywithtitle && categorywithtitle.name == name){
            res.code=400;
            throw new Error(`Category with title ${name} already exists`);
        }
        Category.name = name ? name : category.name;
        Category.description = description? description : category.description;
        Category.updatedBy = _id;
        await Category.save();
        res.status(200).json({code:200,status:true,message: "Category updated successfully",category:Category});
    }
    catch(e){
        next(e);
    }
}

const deleteCategory = async (req,res,next) => {
    try{
        const {id} = req.params;
        const Category = await category.findById(id);
        if(!Category){
            res.code=404;
            throw new Error("Category not found");
        }
        await category.findByIdAndDelete(id);
        res.status(200).json({code:200,status:true,message: "Category deleted successfully"});
    }catch(e){
        next(e);
    }
}

const getCategories = async (req,res,next) => {
    try{
        var {q,size,page}= req.query;
        let query={};
        if(q){
            const search = RegExp(q, 'i');
            query.$or=[
                {name: search},{description: search}
            ]
        }
        size=parseInt(size) || 10;
        page=parseInt(page) || 1;
        const count = await category.countDocuments(query);
        const totalPages = Math.ceil(count / size);
        const startIndex = (page - 1) * size;
        const categories = await category.find(query).skip(startIndex).limit(size);
        res.status(200).json({code:200,status:true,message: "Categories retrieved successfully", data:{categories,totalPages:totalPages,pagenumber:page}});
    }
    catch(e){
        next(e);
    }
}
const getCategory = async (req,res,next) => {
    try{
        const {id} = req.params;
        const Category = await category.findById(id);
        if(!Category){
            res.code=404;
            throw new Error("Category not found");
        }
        res.status(200).json({code:200,status:true,message: "Category retrived successfully",data:Category})
    }
    catch(e){
        next(e);
    }
}

module.exports = {addCategory,updateCategory,deleteCategory,getCategory,getCategories}
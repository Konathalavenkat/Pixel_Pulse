const {user,File,Post,category} = require('../models')

const addPost = async (req, res, next) => {
    try{
        const {title,content,file} = req.body;
        const Category = req.body.category 
        const {_id} = req.user;
        const User = user.findById(_id);
        if(!User){
            res.code=404;
            throw new Error("User not found");
        }
        if(file){
            const isFileExist = File.findById(file);
            if(!isFileExist){
                res.code=404;
                throw new Error("File not found");
            }
        }
        const isCategoryExist = await category.findById(category);
        if(!isCategoryExist){
            res.code=404;
            throw new Error("Category not found");
        }
        const newPost = new Post({title,content,category:Category,author:_id});
        await newPost.save();
        res.status(201).json({code:201,status:true,message: "Post added successfully",post:newPost});
    }catch(err){
        next(err);
    }

}

updatePost = async (req, res, next) => {
    try{
        const {title,content,file} = req.body;
        const Category = req.body.category;
        const {id} = req.params;
        const {_id}= req.user;
        const post = await Post.findById(id);
        console.log("All data fetched successfully")
        if(!post){
            res.code=404;
            throw new Error("Post not found");
        }
        if(file){
            const isFileExist = await File.findById(file);
            if(!isFileExist){
                res.code=404;
                throw new Error("File not found");
            }
            post.file = file;
            // console.log("File Updated")
        }
        if(Category){
            const isCategoryExist = await category.findById(Category);
            if(!isCategoryExist){
                res.code=404;
                throw new Error("Category not found");
            }
            post.category = Category;
            // console.log("Category Updated")
        }
        post.title = title? title : post.title;
        post.content = content? content : post.content;
        post.author = _id;
        // console.log("Author Updated")
        await post.save();  
        // console.log("Post Updated")  // this will throw an error if no data is found
        res.status(200).json({code:200,status:true,message: "Post updated successfully",post});
    }
    catch(err){

    }
} 

deletePost = async (req, res, next) => {
    try{

    }
    catch(err){
        
    }
} 

getPost = async (req, res, next) => {
    try{

    }
    catch(err){
        
    }
} 

getPostById = async (req, res, next) => {
    try{

    }
    catch(err){
        
    }
} 

module.exports = {addPost,updatePost,deletePost,getPost,getPostById};
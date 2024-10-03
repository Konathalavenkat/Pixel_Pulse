const {user,File,Post} = require('../models')


const addPost = async (req, res, next) => {
    try{
        const {title,content,category,file} = req.body;
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
        const newPost = new Post({title,content,category,author:_id});
        await newPost.save();
        res.status(201).json({code:201,status:true,message: "Post added successfully",post:newPost});
    }catch(err){
        next(err);
    }

}

module.exports = {addPost};
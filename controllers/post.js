const { user, File, Post, category } = require("../models");

const addPost = async (req, res, next) => {
  try {
    const { title, content, file } = req.body;
    const Category = req.body.category;
    const { _id } = req.user;
    const User = user.findById(_id);
    if (!User) {
      res.code = 404;
      throw new Error("User not found");
    }
    if (file) {
      const isFileExist = File.findById(file);
      if (!isFileExist) {
        res.code = 404;
        throw new Error("File not found");
      }
    }
    const isCategoryExist = await category.findById(Category);
    if (!isCategoryExist) {
      res.code = 404;
      throw new Error("Category not found");
    }
    const newPost = new Post({
      title,
      content,
      category: Category,
      author: _id,
    });
    await newPost.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "Post added successfully",
      post: newPost,
    });
  } catch (err) {
    next(err);
  }
};

updatePost = async (req, res, next) => {
  try {
    const { title, content, file } = req.body;
    const Category = req.body.category;
    const { id } = req.params;
    const { _id } = req.user;
    const post = await Post.findById(id);
    console.log("All data fetched successfully");
    if (!post) {
      res.code = 404;
      throw new Error("Post not found");
    }
    if (file) {
      const isFileExist = await File.findById(file);
      if (!isFileExist) {
        res.code = 404;
        throw new Error("File not found");
      }
      post.file = file;
      // console.log("File Updated")
    }
    if (Category) {
      const isCategoryExist = await category.findById(Category);
      if (!isCategoryExist) {
        res.code = 404;
        throw new Error("Category not found");
      }
      post.category = Category;
      // console.log("Category Updated")
    }
    post.title = title ? title : post.title;
    post.content = content;
    post.author = _id;
    // console.log("Author Updated")
    await post.save();
    // console.log("Post Updated")  // this will throw an error if no data is found
    res.status(200).json({
      code: 200,
      status: true,
      message: "Post updated successfully",
      post,
    });
  } catch (err) {}
};

deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.code = 404;
      throw new Error("Post not found");
    }
    // await post.remove();
    // if(post.file){

    // }
    await Post.findByIdAndDelete(id);
    res
      .status(200)
      .json({ code: 200, status: true, message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

getPosts = async (req, res, next) => {
  try {
    var { size, page, q } = req.query;
    const Category = req.query.category;
    let query = {};
    if (q) {
      const search = RegExp(q, "i");
      query.$or = [{ title: search }];
    }
    if(Category){
        query.category = Category;
    }
    size = parseInt(size) || 10;
    page = parseInt(page) || 1;
    const postscount = await Post.countDocuments(query);
    const totalPages = Math.ceil(postscount / size);
    const posts = await Post.find(query)
      .populate("file")
      .populate("category")
      .populate("author", "-password -verificationCode -forgotPasswordCode")
      .sort({ updatedAt: -1 })
      .skip((page - 1) * size)
      .limit(size);
    // console.log(query, totalPages, posts)
    res.status(200).json({
      code: 200,
      status: true,
      message: "Posts retrieved successfully",
      data: { posts, totalPages: totalPages, pagenumber: page },
    });
  } catch (err) {
    next(err);
  }
};

getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("file")
      .populate("category")
      .populate("author", "-password -verificationCode -forgotPasswordCode");
    if (!post) {
      res.code = 404;
      throw new Error("Post not found");
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Post retrived successfully",
      data: { post },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addPost, updatePost, deletePost, getPosts, getPostById };

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type:'String', required: true},
    content: {type:'String'},
    author: {type: mongoose.Types.ObjectId, ref: 'user', required: true},
    category: {type: mongoose.Types.ObjectId, ref: 'category', required: true},
    file: {type: mongoose.Types.ObjectId, ref: 'file'},
    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    // comments: [{type: mongoose.Types.ObjectId, ref: 'comment'}],
},{timestamps: true});

module.exports = mongoose.model('post', postSchema);
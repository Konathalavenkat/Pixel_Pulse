const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    updatedBy: {type: mongoose.Types.ObjectId, ref: "user", required: true}
}, {timestamps: true})

module.exports = mongoose.model('category', categorySchema);
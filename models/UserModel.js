const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true,trim: true},
    password: {type: String, required: true,minlength: 6},
    role : {type: Number, required: true,default : 3},
    verificationCode: {type: String},
    isVerified: {type: Boolean, required: false}
},{timestamps: true});

module.exports = mongoose.model('user', UserSchema);
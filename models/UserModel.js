const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true,trim: true},
    password: {type: String, required: true,minlength: 6},
    role : {type: Number, required: true,default : 3}, //1-> superadmin, 2-> admin, 3->user
    verificationCode: {type: String},
    forgotPasswordCode : {type: String},
    isVerified: {type: Boolean, default: false},
    profilePic: {type: mongoose.Types.ObjectId,ref:"file"}
},{timestamps: true});

module.exports = mongoose.model('user', UserSchema);
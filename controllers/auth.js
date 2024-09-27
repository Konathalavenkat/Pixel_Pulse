
const {user} = require('../models');

const signup = async (req,res,next) => {
 try{
   const {name,email,password,role} = req.body;
   
   const isEmailExist = await user.findOne({email: email});
   
   if(isEmailExist) {
     res.code=400;
     throw new Error("Email already exists");
   }
   
   const newuser = new user({name,email,password,role});
   await newuser.save();
   res.status(201).json({code:201, status:true, message: 'User registered successfully.'});
 }catch(e){
   next(e);
 }
};

module.exports = {signup};

const {user} = require('../models');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');
const generateCode = require('../utils/generateCode');

const signup = async (req,res,next) => {
 try{
   const {name,email,password,role} = req.body;
   
   const isEmailExist = await user.findOne({email: email});
   
   if(isEmailExist) {
     res.code=400;
     throw new Error("Email already exists");
   }
   const hashedPassword= await hashPassword(password);
   const newuser = new user({name,email,password:hashedPassword,role});
   await newuser.save();
   res.status(201).json({code:201, status:true, message: 'User registered successfully.'});
 }catch(e){
   next(e);
 }
};

const signin = async (req,res, next)=>{
  try{
    const {email,password} = req.body;
    const existinguser = await user.findOne({email:email});
    if(!existinguser){
      res.code=401;
      throw new Error("User does not exist");
    }
    const match = await comparePassword(password,existinguser.password);
    if(!match){
      res.code=401;
      throw new Error("Invalid credentials");
    }
    const token = generateToken(existinguser);
    res.status(200).json({code:200,status:true,message:"User signed in successfully",token:token});

  }
  catch(e){
    next(e);
  }
};

const getVerificationCode = async (req,res,next) => {
  const {email} = req.body;
  const extuser = await user.findOne({email: email});
  if(!extuser) {
    res.code=404;
    throw new Error("User not found");
  }
  const verificationCode = generateCode(6);

  extuser.verificationCode=verificationCode;
  await extuser.save();
  //email verification code

  //Send email verification code to user
  res.status(200).json({code:200, status:true, message: "Verification code sent successfully"});
}

module.exports = {signup,signin,getVerificationCode};

const {user} = require('../models');

const signup = async (req,res,next) => {
 try{
    const {name,email,password,role} = req.body;
    if(!name){
      res.code = 400;
      throw new Error('Name is required');
    }
    if(!email){
      res.code = 400;
      throw new Error('Email is required');
    }
    if(!password){
      res.code= 400;
      throw new Error('Password is required');
    }
    if(password.length < 6){
      res.code= 400;
      throw new Error('Password must be at least 6 characters long');
    }
    const newuser = new user({name,email,password,role});
    await newuser.save();
    res.status(201).json({code:201, status:true, message: 'User registered successfully.'});
 }catch(e){
    next(e);
 }
};

module.exports = {signup};
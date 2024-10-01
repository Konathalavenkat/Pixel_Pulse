const isadmin = async (req,res,next)=>{
    try{
        const user = req.user;
        if(user.role === 1 || user.role === 2){
            return next();
        }
        res.code=400;
        throw new Error("Unauthorized access");
    }
    catch(e){
        next(e);
    }
}

module.exports = isadmin;
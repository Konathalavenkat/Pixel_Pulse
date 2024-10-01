const uploadFile = async (req,res,next) => {
    try{
        res.send("working");
    }
    catch(e){
        next(e);
    }
}

module.exports = {uploadFile}
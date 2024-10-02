const multer = require('multer');
const path = require('path');
const generateCode = require('../utils/generateCode');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const fileName = originalName.replace(extension,"");
        const compressedFileName = fileName.split(" ").join("_");
        const code = generateCode(12);
        const finalFilename = `${compressedFileName}_${code}.${extension}`;
        cb(null, finalFilename);

    },
})


const upload = multer({
    storage,
    fileFilter: (req,file,callback)=>{
        const mimetype = file.mimetype;
        if(mimetype === "image/jpeg" || mimetype === "image/jpg" || mimetype === "image/png" || mimetype === "application/pdf"){
            callback(null, true);
        }
        else{
            callback(new Error("Only JPEG, JPG, PNG and PDF files are allowed."), false);
        }
    }
});

// const upload = multer({
//     dest: './uploads',
// })

module.exports = upload;
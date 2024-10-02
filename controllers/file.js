const path = require("path");
const { validateExtension } = require("../validators/file");
// const {
//   uploadFileToS3,
//   signedUrl,
//   deleteFileFromS3,
// } = require("../utils/awsS3"); //use these for Amazon S3

const {uploadFileToDrive, generateSignedUrl, deleteFileFromDrive} = require("../utils/GDrive");
const { File } = require("../models");

const uploadFile = async (req, res, next) => {
  try {
    const { file } = req;

    if (!file) {
      res.code = 400;
      throw new Error("File is not selected");
    }

    const ext = path.extname(file.originalname);
    const isValidExt = validateExtension(ext);

    if (!isValidExt) {
      res.code = 400;
      throw new Error("Only .jpg or .jpeg or .png format is allowed");
    }

    const key = await uploadFileToDrive({ file, ext });
    let newFile = null;
    if (key) {
      newFile = new File({
        key,
        size: file.size,
        mimetype: file.mimetype,
        createdBy: req.user._id,
      });

      await newFile.save();
    }
    res.status(201).json({
      code: 201,
      status: true,
      message: "File uploaded successfully",
      data: { key, _id: newFile._id },
    });
  } catch (error) {
    next(error);
  }
};

const getSignedUrl = async (req, res, next) => {
  try {
    const { key } = req.query;
    const url = await generateSignedUrl(key);

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get signed url successfully",
      data: { url },
    });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { key } = req.query;

    await deleteFileFromDrive(key);
    await File.findOneAndDelete({ key });

    res
      .status(200)
      .json({ code: 200, status: true, message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile, getSignedUrl, deleteFile };
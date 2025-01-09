const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

const upload = multer({ storage });

exports.upload1 = upload.fields([
  { name: "PassportIDCopy", maxCount: 1 },
  { name: "CurrentPicture", maxCount: 1 },
]);

exports.bussinesupload = upload.fields([
  { name: "TradeCopy", maxCount: 1 },
  { name: "RequestLetter", maxCount: 1 },
  { name: "PassportIDCopy", maxCount: 1 },
]);

exports.slaespartnerupload = upload.fields([
  { name: 'PassportIDCopy', maxCount: 1 },
  { name: 'CurrentPicture', maxCount: 1 },
  { name: 'ExperianceProfile', maxCount: 1 },
]);
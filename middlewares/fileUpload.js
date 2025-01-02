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

module.exports = upload.fields([
  { name: "PassportIDCopy", maxCount: 1 },
  { name: "CurrentPicture", maxCount: 1 },
]);

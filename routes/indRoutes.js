const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/indController");
const { upload } = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/", upload.fields([
  { name: "PassportIDCopy", maxCount: 1 },
  { name: "CurrentPicture", maxCount: 1 },
]), createUser);
router.get("/:id", getUser);
router.put("/:id", upload.fields([
  { name: "PassportIDCopy", maxCount: 1 },
  { name: "CurrentPicture", maxCount: 1 },
]), updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

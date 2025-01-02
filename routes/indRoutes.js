const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/indController");
const upload = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/", upload, createUser);
router.get("/:id", getUser);
router.put("/:id", upload, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

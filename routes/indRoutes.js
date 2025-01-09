const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/indController");
const {upload1 } = require("../middlewares/fileUpload");
const { validateUserCreation } = require('../validators/indvitulValidator');


const router = express.Router();

router.post("/", validateUserCreation, upload1, createUser);
router.get("/:id", getUser);
router.put("/:id", upload1, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

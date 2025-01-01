const express = require("express");
const {
  createInvestor,
  getInvestor,
  updateInvestor,
  deleteInvestor,
} = require("../controllers/investorController");
const { upload } = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/", upload.fields([
  { name: "PassportIDCopy", maxCount: 1 },
  { name: "CurrentPicture", maxCount: 1 },
]), createInvestor);
router.get("/:id", getInvestor);
router.put("/:id", upload.fields([
  { name: "PassportIDCopy", maxCount: 1 },
  { name: "CurrentPicture", maxCount: 1 },
]), updateInvestor);
router.delete("/:id", deleteInvestor);

module.exports = router;

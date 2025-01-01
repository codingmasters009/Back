const express = require("express");
const {
  createSalesPartner,
  getSalesPartner,
  updateSalesPartner,
  deleteSalesPartner,
} = require("../controllers/salespartnerController");
const { upload } = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/", upload.fields([
  { name: "PassportIDCopy", maxCount: 1 },
  { name: "CurrentPicture", maxCount: 1 },
  { name: "ExperianceProfile", maxCount: 1 },
]), createSalesPartner);
router.get("/:id", getSalesPartner);
router.put("/:id", upload.fields([
  { name: "PassportIDCopy", maxCount: 1 },
  { name: "CurrentPicture", maxCount: 1 },
  { name: "ExperianceProfile", maxCount: 1 },
]), updateSalesPartner);
router.delete("/:id", deleteSalesPartner);

module.exports = router;
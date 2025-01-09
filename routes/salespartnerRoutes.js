const express = require("express");
const {
  createSalesPartner,
  getSalesPartner,
  updateSalesPartner,
  deleteSalesPartner,
} = require("../controllers/salespartnerController");
const { slaespartnerupload } = require("../middlewares/fileUpload");
const { validateSalesPartnerCreation } = require('../validators/salespartenerValidator');

const router = express.Router();

router.post("/", validateSalesPartnerCreation, slaespartnerupload, createSalesPartner);
router.get("/:id", getSalesPartner);
router.put("/:id", slaespartnerupload, updateSalesPartner);
router.delete("/:id", deleteSalesPartner);

module.exports = router;
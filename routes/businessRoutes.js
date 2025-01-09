const express = require("express");
const {
  createBusiness,
  getBusiness,
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");
const {bussinesupload} = require("../middlewares/fileUpload");
const { validateBusinessCreation } = require('../validators/bussinesValidator');


const router = express.Router();

router.post("/", validateBusinessCreation, bussinesupload, createBusiness);
router.get("/:id", getBusiness);
router.put("/:id", bussinesupload, updateBusiness);
router.delete("/:id", deleteBusiness);

module.exports = router;

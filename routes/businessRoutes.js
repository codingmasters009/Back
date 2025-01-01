const express = require("express");
const {
  createBusiness,
  getBusiness,
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");
const { upload } = require("../middlewares/fileUpload");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "TradeCopy", maxCount: 1 },
    { name: "PassportIDCopy", maxCount: 1 },
    { name: "RequestLetter", maxCount: 1 },
  ]),
  createBusiness
);
router.get("/:id", getBusiness);
router.put(
  "/:id",
  upload.fields([
    { name: "TradeCopy", maxCount: 1 },
    { name: "PassportIDCopy", maxCount: 1 },
    { name: "RequestLetter", maxCount: 1 },
  ]),
  updateBusiness
);
router.delete("/:id", deleteBusiness);

module.exports = router;

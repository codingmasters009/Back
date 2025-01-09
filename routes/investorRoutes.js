const express = require("express");
const {
  createInvestor,
  getInvestor,
  updateInvestor,
  deleteInvestor,
} = require("../controllers/investorController");
const { upload1 } = require("../middlewares/fileUpload");
const { validateUserCreation } = require('../validators/indvitulValidator');

const router = express.Router();

router.post("/", validateUserCreation, upload1, createInvestor);
router.get("/:id", getInvestor);
router.put("/:id", upload1, updateInvestor);
router.delete("/:id", deleteInvestor);

module.exports = router;

